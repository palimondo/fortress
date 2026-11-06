# Mechanical check of c13, the writer's files, base c124c6b65

## Row 790, rewritten (951 characters)
- lengths: row 951 of 1,200, claim 248 of 300, notes 497 of 700
- reproducer `ProjectFortress/compiler_tests/XXXDuplicateExtendsEntry.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:779-803` (ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java): no word to check; reads: public static String [] extendsClauseToInterfaces(List<TraitTypeWhere> extendsC, APIName ifMissing, String erasedName) {
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:733-755`
- every check passes

## Row 889, rewritten (1028 characters)
- lengths: row 1028 of 1,200, claim 244 of 300, notes 583 of 700
- reproducer `ProjectFortress/compiler_tests/XXXExtendsGenericAtTupleOfAny.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6024` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): no word to check; reads: generateTypeReference(mv2,rttiClassName, null, Collections.<StaticArg>emptyList(), spns);
  - `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:1720` (ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java): no word to check; reads: Option<APIName> actualApiOpt = id_or_op.getApiName();
  - `CodeGen.java:6051` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): no word to check; reads: generateTypeReference(mv2,rttiClassName, null, Collections.<StaticArg>emptyList(), spns);
- in the old line, not in the new: `:5774`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:5747`, `compiler/NamingCzar.java`, `compiler/NamingCzar.java:1720`
- every check passes

## Row 366, rewritten (1101 characters)
- lengths: row 1101 of 1,200, claim 257 of 300, notes 622 of 700
- reproducer `ProjectFortress/compiler_tests/XXXOprParamRungS.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/runtimeSystem/MethodInstantiater.java:119-132` (ProjectFortress/src/com/sun/fortress/runtimeSystem/MethodInstantiater.java): holds opr; reads: List<String> opr_params = Useful.retain(parameters, filter);
- in the old line, not in the new: `"factory"`, `:5756`, `:5783`, `:5822-5823`, `:5831`, `OpArg`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `stringOps.typeName`, `❮+❯`
- every check passes

## Row 404, rewritten (1174 characters)
- lengths: row 1174 of 1,200, claim 297 of 300, notes 700 of 700
- reproducer `none`: exists
- citations:
  - `explorations/reviews/spec-refused-examples/probes/AltCovariantVariance.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `Documentation/Specification/Prose/Language/types.tick:320-339` (Documentation/Specification/Prose/Language/types.tick): no word to check; reads: % in which the parameters are instantiated with corresponding arguments.
- in the old line, not in the new: `AltCovariantVariance.fss`, `AltEveryContraObject.fss`, `explorations/reviews/spec-refused-examples/probes/`
- every check passes

## Row 406, rewritten (1135 characters)
- lengths: row 1135 of 1,200, claim 280 of 300, notes 583 of 700
- reproducer `ProjectFortress/compiler_tests/XXXBoolExtendsTwice.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:544-552` (ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala): words moved: checkP at :541,556; BoolArg at :380; reads: def cP(s: BaseType, t: BaseType): CFormula = (s, t) match {
  - `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:546` (ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala): words moved: checkP at :541,556; BoolArg at :380; reads: //Todo: Handle bool args
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6085-6108` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): holds BoolArg; reads: 
- in the old line, not in the new: `:462`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:5829`, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:460-468`, `row 402`
- every check passes

## Row 414, rewritten (1117 characters)
- lengths: row 1117 of 1,200, claim 289 of 300, notes 620 of 700
- reproducer `ProjectFortress/compiler_tests/XXXNatExtendsTwice.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala:297` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala): holds definitelyExcludes; reads: if ( new_analyzer.definitelyExcludes(st, other) )
- in the old line, not in the new: `Box[\ZZ32\]`, `Full[\ZZ32\]`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala:216`
- every check passes

## Row 768, rewritten (1124 characters)
- lengths: row 1124 of 1,200, claim 260 of 300, notes 645 of 700
- reproducer `ProjectFortress/compiler_tests/XXXExportBoolStaticArg.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:671-678` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala): no word to check; reads: private def equalStaticArgs(left: StaticArg, right: StaticArg): Boolean =
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:73-78` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala): no word to check; reads: * The following static arguments are ignored for now:
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:636-643`, `row 737`
- every check passes

## Row 769, rewritten (1174 characters)
- lengths: row 1174 of 1,200, claim 274 of 300, notes 677 of 700
- reproducer `ProjectFortress/compiler_tests/XXXExportSetOfDeclarations.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:431-437` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala): holds existsMatching; reads: private def existsMatching(g: FnDecl, set: Set[FnDecl]): Boolean = {
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:290` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala): holds existsMatching; reads: if ( ! existsMatching(g, overloadingInComp) ) {
  - `source-code.tex:356-361` (Specification/basic/components/source-code.tex): no word to check; reads: A top-level function declaration is satisfied by
- in the old line, not in the new: `row 737`
- every check passes

## Row 834, rewritten (1162 characters)
- lengths: row 1162 of 1,200, claim 291 of 300, notes 665 of 700
- reproducer `ProjectFortress/compiler_tests/XXXExportOperatorHeader.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:431-437` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala): holds existsMatching; reads: private def existsMatching(g: FnDecl, set: Set[FnDecl]): Boolean = {
  - `source-code.tex:356-361` (Specification/basic/components/source-code.tex): no word to check; reads: A top-level function declaration is satisfied by
  - `source-code.tex:413-418` (Specification/basic/components/source-code.tex): no word to check; reads: A method declaration is satisfied
- in the old line, not in the new: nothing
- every check passes

## Row 835, rewritten (1153 characters)
- lengths: row 1153 of 1,200, claim 280 of 300, notes 642 of 700
- reproducer `ProjectFortress/compiler_tests/XXXExportOperatorFunctionalMethod.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:613-620` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala): holds uncoveredDeclarations, SDeclaredFunction; reads: private def uncoveredDeclarations(checker: OverloadingChecker,
  - `scala_src/typechecker/OverloadingChecker.scala:848-852` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala): words moved: coverOverloading at :843; reads: result = result.filter {
  - `ExportChecker.scala:251` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala): words moved: uncoveredDeclarations at :279,282,613; SDeclaredFunction at :317,604,619; reads: overloadingChecker.coverOverloading(toSet(component.functions.matchFirst(v)))
  - `source-code.tex:356-361` (Specification/basic/components/source-code.tex): no word to check; reads: A top-level function declaration is satisfied by
- in the old line, not in the new: `OverloadingChecker.scala`, `OverloadingChecker.scala:848-852`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:618-620`
- every check passes

## Row 836, rewritten (1037 characters)
- lengths: row 1037 of 1,200, claim 198 of 300, notes 672 of 700
- reproducer `ProjectFortress/compiler_tests/XXXExportOperatorStaticParamName.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:654-662` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala): words moved: equalFnHeaders at :433,632,863; reads: private def equalStaticParams(left: StaticParam, right: StaticParam): Boolean =
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:632-645` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala): words moved: equalStaticParams at :651,654; reads: private def equalFnHeaders(left: FnHeader, right: FnHeader,
- in the old line, not in the new: nothing
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 790: row 790: rewritten (951 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 889: row 889: rewritten (1028 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 366: row 366: rewritten (1101 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 404: row 404: rewritten (1174 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 406: row 406: rewritten (1135 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 414: row 414: rewritten (1117 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 768: row 768: rewritten (1124 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 769: row 769: rewritten (1174 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 834: row 834: rewritten (1162 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 835: row 835: rewritten (1153 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 836: row 836: rewritten (1037 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 11 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 11 lines, 0 failing, every check passes.
