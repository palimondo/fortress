# Mechanical check of c5, the judge's files, base c124c6b65

## Row 434, rewritten (1024 characters)
- lengths: row 1024 of 1,200, claim 240 of 300, notes 677 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fss:386-392` (Library/FortressLibrary.fss): holds asFloat(self) = asFloat(other); reads: opr =(self, other:Number):Boolean =
  - `Library/FortressLibrary.fss:383-385` (Library/FortressLibrary.fss): words moved: asFloat(self) = asFloat(other) at :388,389,391; reads: (** Two exact numbers of different types compare as rationals; a float
  - `explorations/compile-ladder/rung-flat-tower/probes/skeptic/sk-exprs-equality.txt`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `:380-382`, `Library/FortressLibrary.fss:383-392`
- every check passes

## Row 371, rewritten (1114 characters)
- lengths: row 1114 of 1,200, claim 217 of 300, notes 665 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:166-190` (ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java): holds TypeHierarchyChecker; reads: if (Shell.getTypeChecking() == true) {
  - `TypeHierarchyChecker.scala:298-300` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala): words moved: TypeHierarchyChecker at :46; reads: error(errors, "Types " + st + " and " + other +
  - `TypeHierarchyChecker.scala:307-308` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala): words moved: TypeHierarchyChecker at :46; reads: error(errors, "Type " + tt + " excludes " + name +
  - `FTraitOrObject.java:236-251` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTraitOrObject.java): no word to check; reads: private static TopSortItemImpl<FType> visitTrait(FType t,
- in the old line, not in the new: `StaticChecker.java`, `StaticChecker.java:166-190`, `explorations/compile-ladder/rung-analyzer-memo/probes/skeptic/SkWalkExcl*.fss`
- every check passes

## Row 372, rewritten (1003 characters)
- lengths: row 1003 of 1,200, claim 162 of 300, notes 683 of 700
- reproducer `none`: exists
- citations:
  - `interpreter/evaluator/types/FTraitOrObject.java:245-247` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTraitOrObject.java): holds getExtends(); reads: for (FType e : t.getExtends()) {
  - `TypeHierarchyChecker.scala:199-200` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala): no word to check; reads: if (children contains decl) {
  - `FTraitOrObject.java:236-251` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTraitOrObject.java): holds visitTrait; reads: private static TopSortItemImpl<FType> visitTrait(FType t,
  - `explorations/compile-ladder/rung-analyzer-memo/probes/skeptic/SkWalkCyclePlain.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/compile-ladder/rung-spec-route-a/probes/skeptic/SkSelfExtBound.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `:158`, `Cyclic type hierarchy: Type X transitively extends itself.`, `SkSelfExtBound.fss`, `SkWalkCyclePlain.fss`, `TypeHierarchyChecker.scala:119`, `explorations/compile-ladder/`
- every check passes

## Row 407, rewritten (1024 characters)
- lengths: row 1024 of 1,200, claim 218 of 300, notes 696 of 700
- reproducer `none`: exists
- citations:
  - `FType.java:209` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java): no word to check; reads: return excludesOtherInner(other);
  - `SymbolicType.java:80` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/SymbolicType.java): no word to check; reads: if (t1.excludesOther(other)) {
  - `FType.java:288-294` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java): no word to check; reads: for (FType t1 : getTransitiveComprises()) {
  - `Library/CompilerAlgebra.fsi:16` (Library/CompilerAlgebra.fsi): no word to check; reads: trait StandardTotalOrder[\T\] extends {Equality[\T\], AllStandardTotalOrders} comprises T
  - `Library/CompilerAlgebra.fsi:24` (Library/CompilerAlgebra.fsi): no word to check; reads: trait Equality[\T\] comprises T
- in the old line, not in the new: `P-146`
- every check passes

## Row 487, rewritten (1134 characters)
- lengths: row 1134 of 1,200, claim 219 of 300, notes 666 of 700
- reproducer `ProjectFortress/tests/XXXComprisesGenericChildAcrossComponents.fss`: exists
- citations:
  - `TypeHierarchyChecker.scala:405-415` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala): holds everyKnownSubtypeListed; reads: private def everyKnownSubtypeListed(tt: TraitType, comprises: Set[NamedType],
- in the old line, not in the new: `TypeHierarchyChecker.scala:313-325`, `[\I extends Integral[\I\]\]`, `main`, `perf-probes/anyintegral-comprises-where/REPORT.md`
- every check passes

## Row 489, rewritten (1121 characters)
- lengths: row 1121 of 1,200, claim 230 of 300, notes 669 of 700
- reproducer `ProjectFortress/compiler_tests/XXXComprisesGenericRenamed.test`: exists
- citations:
  - `TypeHierarchyChecker.scala:333` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala): holds subst_comprises; reads: ! isEligibleToExtend(tt, subst_comprises, new_analyzer, errors, whereBounds) &&
  - `TypeHierarchyChecker.scala:327` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala): holds subst_comprises; reads: val subst_comprises = comprises.map(c => atArgs(c).asInstanceOf[NamedType])
- in the old line, not in the new: `:237-240`, `AnyIntegral`, `TypeHierarchyChecker.scala:321-322`
- every check passes

## Row 490, rewritten (1071 characters)
- lengths: row 1071 of 1,200, claim 223 of 300, notes 686 of 700
- reproducer `none`: exists
- citations:
  - `TypeHierarchyChecker.scala:410` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala): holds st.getName.getText.equals(tt.getName.getText); reads: case st: TraitType => st.getName.getText.equals(tt.getName.getText)
- in the old line, not in the new: `TypeHierarchyChecker.scala:317`
- every check passes

## Row 595, rewritten (1079 characters)
- lengths: row 1079 of 1,200, claim 236 of 300, notes 699 of 700
- reproducer `none`: exists
- citations:
  - `Library/Reflect.fss:305` (Library/Reflect.fss): holds object Reflect[\T\]() extends Type; reads: object Reflect[\T\]() extends Type
  - `Library/Reflect.fss:21-23` (Library/Reflect.fss): words moved: object Reflect[\T\]() extends Type at :305; reads: trait Type extends StandardTotalOrder[\Type\]
  - `Library/Reflect.fsi:9-11` (Library/Reflect.fsi): words moved: Reflect at :6; reads: trait Type extends StandardTotalOrder[\Type\]
- in the old line, not in the new: `Library/Reflect.fss:20-22`, `Library/Reflect.fss:304`
- every check passes

## Row 596, rewritten (987 characters)
- lengths: row 987 of 1,200, claim 281 of 300, notes 503 of 700
- reproducer `none`: exists
- citations:
  - `tests/extendNumber.fss:17` (ProjectFortress/tests/extendNumber.fss): holds Number; reads: object Infinity extends Number
  - `extendException.fss:17` (ProjectFortress/tests/extendException.fss): holds Exception; reads: object Infinity extends Exception
  - `atomicList.fss:24` (ProjectFortress/tests/atomicList.fss): holds Exception; reads: object ListError(msg:String) extends Exception end
  - `typeTests.fss:15` (ProjectFortress/tests/typeTests.fss): holds Exception; reads: object Error extends Exception end
  - `demos/tictactoe.fss:29` (ProjectFortress/demos/tictactoe.fss): words moved: Number at :34; reads: object IllegalMove(n) extends Exception
  - `newtictactoe.fss:26` (ProjectFortress/demos/newtictactoe.fss): words moved: Number at :31; reads: object IllegalMove(n) extends Exception
  - `explorations/compile-ladder/rung-walk-load-check/REPORT.md:199` (explorations/compile-ladder/rung-walk-load-check/REPORT.md): no word to check; reads: Reading them across components would also refuse four team tests whose objects extend the library's `Number` or `Exception` directly (`tests
  - `Library/FortressLibrary.fss:380-381` (Library/FortressLibrary.fss): no word to check; reads: trait Number extends { AnyAdditiveGroup, AnyMultiplicativeRing }
  - `CompilerBuiltin.fss:510` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): no word to check; reads: trait Number excludes { String }
- in the old line, not in the new: `Library/FortressLibrary.fss:377-378`, `Specification/basic-lib/numbers.tex`, `tests/extendNumber.fss:15`
- every check passes

## Row 597, rewritten (1076 characters)
- lengths: row 1076 of 1,200, claim 248 of 300, notes 610 of 700
- reproducer `ProjectFortress/tests/XXXComprisesObjectExpressionUnlisted.fss`: exists
- citations:
  - `BuildEnvironments.java:1299-1313` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java): no word to check; reads: void check(int main) {
  - `TypeHierarchyChecker.scala:64` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala): holds checkObjectExprComprises; reads: if (!isApi) checkObjectExprComprises(compilation_unit.ast, errors, analyzer)
  - `TypeHierarchyChecker.scala:73` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala): holds checkObjectExprComprises; reads: private def checkObjectExprComprises(ast: Node,
- in the old line, not in the new: `BuildEnvironments.checkComprisesClauses`, `TypeHierarchyChecker.scala:62-99`
- every check passes

## Row 598, rewritten (1190 characters)
- lengths: row 1190 of 1,200, claim 267 of 300, notes 700 of 700
- reproducer `ProjectFortress/tests/XXXComprisesListedTypeExtendsEachInstance.fss`: exists
- citations:
  - `BuildEnvironments.java:1299-1313` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java): no word to check; reads: void check(int main) {
- in the old line, not in the new: nothing
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 434: row 434: rewritten (1024 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 371: row 371: rewritten (1114 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 372: row 372: rewritten (1003 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 407: row 407: rewritten (1024 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 487: row 487: rewritten (1134 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 489: row 489: rewritten (1121 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 490: row 490: rewritten (1071 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 595: row 595: rewritten (1079 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 596: row 596: rewritten (987 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 597: row 597: rewritten (1076 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 598: row 598: rewritten (1190 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 11 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 11 lines, 0 failing, every check passes.
