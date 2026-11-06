# Mechanical check of c15, the writer's files, base c124c6b65

## Row 355, rewritten (1193 characters)
- lengths: row 1193 of 1,200, claim 275 of 300, notes 695 of 700
- reproducer `none`: exists
- citations:
  - `Library/PureList.fsi:41` (Library/PureList.fsi): holds trait List[\E\] extends { Equality[\E\], ZeroIndexed[\E\] }; reads: trait List[\E\] extends { Equality[\E\], ZeroIndexed[\E\] }
  - `Library/PureList.fss:41-42` (Library/PureList.fss): holds ZeroIndexed[\E\], LexicographicOrder[\List[\E\],E\] where { E extends StandardTotalOrder[\E\] }; reads: trait List[\E\] extends { ZeroIndexed[\E\],
  - `Library/List.fsi:69-70` (Library/List.fsi): holds AnyList, Equality[\List[\E\]\]; reads: trait List[\E\] extends { AnyList, ZeroIndexed[\E\], Equality[\List[\E\]\],
  - `Library/PureList.fsi:75` (Library/PureList.fsi): holds zip[\F\](other: List[\F\]): Generator[\(E,F)\]; reads: zip[\F\](other: List[\F\]): Generator[\(E,F)\]
  - `Library/List.fsi:41` (Library/List.fsi): no word to check; reads: Note also that the implementation has not yet been carefully
  - `Library/List.fsi:75` (Library/List.fsi): no word to check; reads: %right% and %extractRight% do the same with the rightmost
  - `explorations/compile-ladder/rung-library-defects/probes/purelist-api-run.txt`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `Library/List.fsi:67-68`, `List.fsi`, `PureList.fsi`, `PureList.fsi:75`, `PureList.fss`
- every check passes

## Row 611, rewritten (1163 characters)
- lengths: row 1163 of 1,200, claim 221 of 300, notes 689 of 700
- reproducer `ProjectFortress/tests/XXXFunctionalMethodMeetOperator.fss`: exists
- citations:
  - `interpreter/evaluator/values/OverloadedFunction.java:2071-2075` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): holds NodeUtil.validOp, checkedName; reads: static private boolean checkedName(IdOrOpOrAnonymousName n) {
  - `Library/String.fss:326` (Library/String.fss): no word to check; reads: opr || (self, _:EmptyString): String = self
- in the old line, not in the new: `OverloadedFunction.java`, `OverloadedFunction.java:1990-1994`, `b872d65a1`, `row 584`, `row 585`
- every check passes

## Row 395, rewritten (1174 characters)
- lengths: row 1174 of 1,200, claim 287 of 300, notes 642 of 700
- reproducer `ProjectFortress/tests/XXXCoercionTupleOverloadRungC.fss`: exists
- citations:
  - `interpreter/evaluator/values/OverloadedFunction.java:2311` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): words moved: Coercions.coercionFor at :2336,2512; reads: private SingleFcn bestMatchWithCoercion(List<FValue> args, List<Overload> someOverloads) {
  - `values/Coercions.java:58` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java): no word to check; reads: static SingleFcn coercionFor(FType target, FValue v) {
  - `values/Coercions.java:329` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java): no word to check; reads: static boolean moreSpecific(List<FType> c, List<FType> d, int n) {
- in the old line, not in the new: `coercionFor`
- every check passes

## Row 397, rewritten (1082 characters)
- lengths: row 1082 of 1,200, claim 275 of 300, notes 563 of 700
- reproducer `ProjectFortress/compiler_tests/XXXTupleVarFieldCompiledRungC.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:791` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): no word to check; reads: int arity = from_params.size();
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:834` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): no word to check; reads: String from_sig = NamingCzar.jvmSignatureFor(
- in the old line, not in the new: `:826-831`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:784`
- every check passes

## Row 722, rewritten (830 characters)
- lengths: row 830 of 1,200, claim 265 of 300, notes 362 of 700
- reproducer `ProjectFortress/tests/XXXOpenRangeInferredIndexWalk.fss`: exists
- citations:
  - `Library/FortressLibrary.fss:4225-4230` (Library/FortressLibrary.fss): holds openRange, typecase __thrower[\I\], () -> ZZ32; reads: openRange[\I\](): OpenRange[\I\] =
  - `Library/FortressLibrary.fss:4227` (Library/FortressLibrary.fss): words moved: openRange at :2026,4225; typecase __thrower[\I\] at :4226; reads: () -> ZZ32 => cast[\OpenRange[\I\]\](open1Range(1))
- in the old line, not in the new: `:4077:23-58`, `Library/FortressLibrary.fss:4075-4080`
- every check passes

## Row 773, rewritten (1059 characters)
- lengths: row 1059 of 1,200, claim 270 of 300, notes 646 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala:134-136` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala): no word to check; reads: // A conditional extension's conditions hold while the members are checked.
- in the old line, not in the new: nothing
- every check passes

## Row 774, rewritten (1113 characters)
- lengths: row 1113 of 1,200, claim 233 of 300, notes 681 of 700
- reproducer `ProjectFortress/tests/XXXConditionalExtensionTypeTestWalk.fss`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:725-737` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java): no word to check; reads: * walk's rewrite takes from the declarations around it without their
  - `Library/List.fsi:69` (Library/List.fsi): holds Equality[\List[\E\]\]; reads: trait List[\E\] extends { AnyList, ZeroIndexed[\E\], Equality[\List[\E\]\],
- in the old line, not in the new: `Library/List.fsi:67`
- every check passes

## Row 342, rewritten (1049 characters)
- lengths: row 1049 of 1,200, claim 209 of 300, notes 690 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java:112` (ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java): words moved: populateOne at :101,136; getCached at :53,68,98; getFunctionals() at :199; reads: componentCache.put(graphRepository.pathTaggedComponent(transformed.getName()), transformed);
  - `ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java:121` (ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java): words moved: populateOne at :101,136; getCached at :53,68,98; getFunctionals() at :199; reads: getEnvBuilder().visit(cu);
  - `ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java:53-57` (ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java): words moved: populateOne at :101,136; getFunctionals() at :199; reads: private Component getCached(ComponentIndex comp) {
  - `ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java:108-114` (ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java): words moved: populateOne at :101,136; getCached at :53,68,98; getFunctionals() at :199; reads: if (transformed == null) {
  - `ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java:199-203` (ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java): words moved: populateOne at :101,136; getCached at :53,68,98; reads: public Set<String> getFunctionals() {
- in the old line, not in the new: `:197-201`, `interpreter_parsed_cache/FortressLibrary*`
- every check passes

## Row 384, rewritten (997 characters)
- lengths: row 997 of 1,200, claim 185 of 300, notes 695 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:876-879` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java): words moved: toString at :614,956,959; reads: } else return error(errorMsg("Non-generic-instance type for self argument ",
  - `values/FBigNum.java:40-42` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FBigNum.java): holds toString; reads: public String toString() {
  - `values/OverloadedFunction.java:2393-2396` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): words moved: bestMatchInternal at :2278,2284,2297; reads: catch (FortressException pe) {
  - `explorations/compile-ladder/rung-int-semantics-walk/probes/BigShiftHeapEq.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:610`, `values/OverloadedFunction.java:1559-1562`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 355: row 355: rewritten (1193 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 611: row 611: rewritten (1163 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 395: row 395: rewritten (1174 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 397: row 397: rewritten (1082 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 722: row 722: rewritten (830 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 773: row 773: rewritten (1059 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 774: row 774: rewritten (1113 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 342: row 342: rewritten (1049 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 384: row 384: rewritten (997 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 9 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 9 lines, 0 failing, every check passes.
