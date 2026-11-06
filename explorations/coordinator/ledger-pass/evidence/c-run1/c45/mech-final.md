# Mechanical check of c45, the judge's files, base c124c6b65

## Row 268, rewritten (1070 characters)
- lengths: row 1070 of 1,200, claim 213 of 300, notes 696 of 700
- reproducer `ProjectFortress/syntax_abstraction_tests/transformer/SyntaxHelloWorldUse.fss`: exists
- citations:
  - `SyntaxHelloWorld.fsi:18` (ProjectFortress/syntax_abstraction_tests/transformer/SyntaxHelloWorld.fsi): no word to check; reads: Expr |Expr:=
  - `SyntaxHelloWorld.fsi:11` (ProjectFortress/syntax_abstraction_tests/transformer/SyntaxHelloWorld.fsi): no word to check; reads: 
  - `SyntaxTest.fsi:20` (ProjectFortress/syntax_abstraction_tests/transformer/SyntaxTest.fsi): no word to check; reads: Expr |Expr:=
  - `SyntaxTest.fsi:13` (ProjectFortress/syntax_abstraction_tests/transformer/SyntaxTest.fsi): no word to check; reads: 
  - `parser/Syntax.rats:85-92` (ProjectFortress/src/com/sun/fortress/parser/Syntax.rats): no word to check; reads: */
  - `parser/Syntax.rats:148-153` (ProjectFortress/src/com/sun/fortress/parser/Syntax.rats): no word to check; reads: /* SyntaxDef ::= (ChoiceModifier w)? SyntaxSymbols w => w PreTransformerDecl */
  - `parser/Syntax.rats:186-199` (ProjectFortress/src/com/sun/fortress/parser/Syntax.rats): no word to check; reads: /* PreTransformer ::=
  - `SyntaxAbstractionJUTestAll.java:36` (ProjectFortress/src/com/sun/fortress/syntax_abstractions/SyntaxAbstractionJUTestAll.java): no word to check; reads: return name.endsWith("Use.fss");
  - `SyntaxAbstractionJUTestAll.java:39` (ProjectFortress/src/com/sun/fortress/syntax_abstractions/SyntaxAbstractionJUTestAll.java): no word to check; reads: String[] basisTests = new File(STATIC_TESTS_DIR).list(fssFilter);
  - `build.xml:1507` (build.xml): words moved: testNightly at :1564; reads: <target name="testsyntax" depends="compileAll"
  - `build.xml:1564` (build.xml): holds testsyntax, testNightly; reads: <target name="testNightly" depends="testCruiseControl, testDemos, testsyntax"
  - `explorations/apl-probes/existing-tests/b_SyntaxHelloWorldUse.out`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `*Use.fss`, `63e420a33`, `Syntax*Use.fss`, `Syntax.rats`, `Syntax.rats:85-92`, `Use.fss`, `Use.out`, `explorations/apl-probes/existing-tests/b_Syntax*Use.out`
- every check passes

## Row 291, rewritten (988 characters)
- lengths: row 988 of 1,200, claim 213 of 300, notes 671 of 700
- reproducer `none`: exists
- citations:
  - `STypesUtil.scala:2150` (ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala): words moved: OutAfterTypeChecking at :2154; reads: def assertAfterTypeChecking(ast: Node): Boolean = {
  - `ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:264` (ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java): no word to check; reads: if( errors.isEmpty() && STypesUtil.assertAfterTypeChecking(result.ast()) )
  - `ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:126` (ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java): no word to check; reads: TypeCheckerResult checked = checkCompilationUnit(api.getValue(), env, true);
  - `TypeCheckPhase.java:43` (ProjectFortress/src/com/sun/fortress/compiler/phases/TypeCheckPhase.java): no word to check; reads: StaticChecker.ApiResult apiSR = StaticChecker.checkApis(apiIndex.apis(), apiEnv);
  - `TypeWellFormedChecker.scala:252` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala): holds Unbound type; reads: error("Unbound type: " + name, t)
- in the old line, not in the new: `STypesUtil.scala:1991`, `StaticChecker.java`, `StaticChecker.java:264`, `TypeWellFormedChecker.scala:144`, `explorations/reviews/template-checking-plan.md`
- every check passes

## Row 123, rewritten (824 characters)
- lengths: row 824 of 1,200, claim 85 of 300, notes 623 of 700
- reproducer `none`: exists
- citations:
  - `Library/incomplete/basic/Fortress.Standard.fss:52` (Library/incomplete/basic/Fortress.Standard.fss): holds test object TestSuite(testFunctions = {}); reads: test object TestSuite(testFunctions = {})
  - `explorations/run-b2/probes/g1c_testsuite.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: nothing
- every check passes

## Row 532, rewritten (1107 characters)
- lengths: row 1107 of 1,200, claim 264 of 300, notes 700 of 700
- reproducer `ProjectFortress/tests/ReflectiveQuickCheckTest.fss`: exists
- citations:
  - `explorations/coordinator/tools/count-run/count-run.sh:57` (explorations/coordinator/tools/count-run/count-run.sh): words moved: walk at :3,58; reads: FORTRESS_CACHES="$C" timeout -k 10 600 \
- in the old line, not in the new: `ReflectiveQuickCheckTest`, `walk-pass.sh`
- every check passes

## Row 757, rewritten (995 characters)
- lengths: row 995 of 1,200, claim 198 of 300, notes 695 of 700
- reproducer `none`: exists
- citations:
  - `repository/GraphRepository.java:283` (ProjectFortress/src/com/sun/fortress/repository/GraphRepository.java): words moved: isStale at :609,641,654; reads: if (cache_date >= getComponentFileDate(node)) {
  - `repository/GraphRepository.java:614` (ProjectFortress/src/com/sun/fortress/repository/GraphRepository.java): words moved: isStale at :609,641,654; reads: boolean stale1 = youngestSourceDependedOn.get(node) > getCacheDate(node);
- in the old line, not in the new: `... compile SkTcThenCompile.fss`, `... run SkTcThenCompile`, `P.fss`, `SkTcThenCompile.fss`, `SkTcThenCompile.jar`, `analyzed_cache/`, `bytecode_cache/`, `fortress compile P.fss`, `fortress run P`, `fortress typecheck P.fss`, `old-fortress.sh`, `old-fortress.sh <base> <caches> typecheck SkTcThenCompile.fss`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 268: row 268: rewritten (1070 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 291: row 291: rewritten (988 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 123: row 123: rewritten (824 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 532: row 532: rewritten (1107 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 757: row 757: rewritten (995 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 5 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 5 lines, 0 failing, every check passes.
