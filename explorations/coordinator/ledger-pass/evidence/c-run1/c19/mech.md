# Mechanical check of c19, the writer's files, base c124c6b65

## Row 565, rewritten (1152 characters)
- lengths: row 1152 of 1,200, claim 215 of 300, notes 680 of 700
- reproducer `ProjectFortress/compiler_tests/XXXGenericTraitFunctionalMethodOverride.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3212` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): holds NamingCzar.genericMethodName; reads: String method_name = NamingCzar.genericMethodName(new FnNameInfo(new_fndecl, trait_sparams, thisApi()), selfIndex, thisApi());
- in the old line, not in the new: `SkFnMeth.fss`, `compile-ladder/rung-walk-instance/SKEPTIC.md`
- every check passes

## Row 594, rewritten (1082 characters)
- lengths: row 1082 of 1,200, claim 165 of 300, notes 685 of 700
- reproducer `ProjectFortress/compiler_tests/XXXGenericFunctionalMethodSelfSecond.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3212` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): no word to check; reads: String method_name = NamingCzar.genericMethodName(new FnNameInfo(new_fndecl, trait_sparams, thisApi()), selfIndex, thisApi());
- in the old line, not in the new: `compile-ladder/rung-walk-instance/SKEPTIC.md`
- every check passes

## Row 724, rewritten (971 characters)
- lengths: row 971 of 1,200, claim 243 of 300, notes 494 of 700
- reproducer `ProjectFortress/compiler_tests/XXXGenericFunctionalMethodBesidePlain.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:2574-2578` (ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java): no word to check; reads: protected TaggedFunctionName getFunctionToCall(TaggedFunctionName f) {
  - `CodeGen.java:4375` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): words moved: generateTopLevelOverloads at :1860,4666,5407; reads: public void forObjectDeclPrePass(ObjectDecl x) {
  - `CodeGen.java:4666` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): holds generateTopLevelOverloads; reads: generateTopLevelOverloads(thisApi(), overloads, typeAnalyzer, cw,
  - `CodeGen.java:6897` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): holds generateTopLevelOverloads; reads: public static Set<String> generateTopLevelOverloads(APIName api_name,
- in the old line, not in the new: `:6652`, `CodeGen.java:4391`, `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:2575-2578`
- every check passes

## Row 539, rewritten (1185 characters)
- lengths: row 1185 of 1,200, claim 285 of 300, notes 652 of 700
- reproducer `ProjectFortress/tests/XXXOverloadExistentialMeetWalk.fss`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:1374` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): words moved: genericMeetCovered at :956,978,1234; reads: static private boolean matchApart(FType a, FType b, Map<FType, FType> parent) {
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:1251` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): words moved: genericMeetCovered at :956,978,1234; reads: if (!matchApart(deRest(d1.get(k)), deRest(d2.get(k)), parent)) return false;
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:1006` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): no word to check; reads: static private boolean domainsExcludeTogether(Overload o1, Overload o2) {
- in the old line, not in the new: `:1171`, `:936`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:1294`
- every check passes

## Row 550, rewritten (1181 characters)
- lengths: row 1181 of 1,200, claim 256 of 300, notes 695 of 700
- reproducer `ProjectFortress/tests/XXXGenericBesidePlainReturnParam.fss`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:772` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): holds validOnDeclaredDomains; reads: static private DomainReading validOnDeclaredDomains(Overload o1, Overload o2, Collection<Overload> all) {
  - `OverloadedFunction.java:1165` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): holds returnRuleAtEveryInstance; reads: static private boolean returnRuleAtEveryInstance(SingleFcn inner, List<FType> dIn,
- in the old line, not in the new: `:1085`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:790`, `tests/XXXGenericBesidePlainReturnRule.fss`
- every check passes

## Row 723, rewritten (1148 characters)
- lengths: row 1148 of 1,200, claim 260 of 300, notes 663 of 700
- reproducer `ProjectFortress/tests/XXXGenericFunctionalMethodBesidePlainWalk.fss`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/GenericMethod.java:149` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/GenericMethod.java): no word to check; reads: List<Parameter> fparams = EvalType.paramsToParameters(env, params);
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/GenericMethod.java:144-145` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/GenericMethod.java): no word to check; reads: // TODO work in progress
  - `OverloadedFunction.java:163` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): no word to check; reads: if (!cl.getFinished()) cl.finishInitializing();
- in the old line, not in the new: `OverloadedFunction.java:161`
- every check passes

## Row 744, rewritten (1145 characters)
- lengths: row 1145 of 1,200, claim 291 of 300, notes 693 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java:130` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java): holds OverloadedMethod; reads: if (_cl instanceof OverloadedMethod) {
  - `Library/Generator2.fss:75-76` (Library/Generator2.fss): no word to check; reads: distributes[\R,L1,L2\](q : ActualReduction[\R,L1\], r : ActualReduction[\R,L2\]) : Boolean = r.distribute[\L1\](q).holds
- in the old line, not in the new: `Any`, `cdd25b95d`
- every check passes

## Row 760, rewritten (1079 characters)
- lengths: row 1079 of 1,200, claim 223 of 300, notes 637 of 700
- reproducer `ProjectFortress/tests/XXXDispatchGenericMethodBesidePlain.fss`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/GenericMethod.java:149` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/GenericMethod.java): no word to check; reads: List<Parameter> fparams = EvalType.paramsToParameters(env, params);
  - `OverloadedFunction.java:163` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): no word to check; reads: if (!cl.getFinished()) cl.finishInitializing();
- in the old line, not in the new: `:161`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/GenericMethod.java:137`
- every check passes

## Row 779, rewritten (1061 characters)
- lengths: row 1061 of 1,200, claim 280 of 300, notes 560 of 700
- reproducer `ProjectFortress/tests/XXXGenericFunctionalMethodsNestedWalk.fss`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:960` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): holds genericPairValid; reads: static private DomainReading genericPairValid(Overload o1, Overload o2, Collection<Overload> all) {
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:2573` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): words moved: genericPairValid at :763,775,821; reads: static SingleFcn instanceHolding(SingleFcn g, List<FType> ts, boolean normalized) {
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:967-968` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): words moved: genericPairValid at :763,775,821; reads: SingleFcn gHolding = instanceHolding(g, d1, true);
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:2332`
- every check passes

## Row 780, rewritten (1070 characters)
- lengths: row 1070 of 1,200, claim 281 of 300, notes 553 of 700
- reproducer `ProjectFortress/tests/XXXGenericTraitFunctionalMethodsNestedWalk.fss`: exists
- citations: none with lines
- in the old line, not in the new: nothing
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 565: row 565: rewritten (1152 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 594: row 594: rewritten (1082 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 724: row 724: rewritten (971 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 539: row 539: rewritten (1185 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 550: row 550: rewritten (1181 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 723: row 723: rewritten (1148 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 744: row 744: rewritten (1145 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 760: row 760: rewritten (1079 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 779: row 779: rewritten (1061 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 780: row 780: rewritten (1070 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 10 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 10 lines, 0 failing, every check passes.
