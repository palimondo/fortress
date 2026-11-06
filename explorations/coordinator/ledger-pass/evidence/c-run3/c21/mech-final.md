# Mechanical check of c21, the judge's files, base c124c6b65

## Row 496, rewritten (1191 characters)
- lengths: row 1191 of 1,200, claim 263 of 300, notes 694 of 700
- reproducer `ProjectFortress/compiler_tests/XXXGenericBesidePlainZZ32.test`: exists
- citations:
  - `OverloadSet.java:1342-1353` (ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java): no word to check; reads: private StaticTypeReplacer atTemplateParams(TaggedFunctionName f) {
  - `OverloadSet.java:2048` (ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java): no word to check; reads: // Not sure what to do with return type.
  - `explorations/compile-ladder/rung-inference-checker/probes/skeptic/S2CtxConvWinsZ.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `052a7c3fe`, `OverloadSet.java:2048`, `row 493`, `row 494`
- every check passes

## Row 499, rewritten (1155 characters)
- lengths: row 1155 of 1,200, claim 261 of 300, notes 671 of 700
- reproducer `ProjectFortress/compiler_tests/XXXGenericPositionalBox.test`: exists
- citations:
  - `OverloadSet.java:1342-1353` (ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java): no word to check; reads: private StaticTypeReplacer atTemplateParams(TaggedFunctionName f) {
  - `scala_src/typechecker/impls/Functionals.scala:824-832` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala): no word to check; reads: val head: Option[Ranked] =
- in the old line, not in the new: `ProjectFortress/compiler_tests/XXXGenericPositionalBox.fss`, `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java`, `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:1342-1353`, `e2f1aa7e8`, `scala_src/typechecker/impls/Functionals.scala:741-749`
- every check passes

## Row 538, rewritten (1183 characters)
- lengths: row 1183 of 1,200, claim 288 of 300, notes 608 of 700
- reproducer `ProjectFortress/compiler_tests/XXXGenericInstanceUnfixed.test`: exists
- citations:
  - `OverloadSet.java:1484` (ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java): no word to check; reads: //Runtime inference for some cases
  - `OverloadSet.java:2048` (ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java): no word to check; reads: // Not sure what to do with return type.
- in the old line, not in the new: `052a7c3fe`
- every check passes

## Row 699, rewritten (1075 characters)
- lengths: row 1075 of 1,200, claim 267 of 300, notes 594 of 700
- reproducer `ProjectFortress/compiler_tests/XXXGenericInstanceReturnOnly.test`: exists
- citations:
  - `OverloadSet.java:2048` (ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java): no word to check; reads: // Not sure what to do with return type.
- in the old line, not in the new: `compiler_tests/XXXGenericInstanceReturnOnly.test`
- every check passes

## Row 813, rewritten (1070 characters)
- lengths: row 1070 of 1,200, claim 258 of 300, notes 584 of 700
- reproducer `ProjectFortress/compiler_tests/XXXImportExplicitHidesOnDemand.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:252-255` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala): words moved: except at :38,39,40; reads: private def importsOnDemand(index: CompilationUnitIndex, i: ImportStar, name: String): Boolean =
- in the old line, not in the new: `row 811`
- every check passes

## Row 814, rewritten (1198 characters)
- lengths: row 1198 of 1,200, claim 278 of 300, notes 699 of 700
- reproducer `ProjectFortress/compiler_tests/XXXImportExceptOperator.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:252-255` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala): holds importsOnDemand; reads: private def importsOnDemand(index: CompilationUnitIndex, i: ImportStar, name: String): Boolean =
  - `ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TopLevelEnv.java:726-733` (ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TopLevelEnv.java): no word to check; reads: private static ApiIndex remove(ApiIndex index, final Set<IdOrOpOrAnonymousName> exceptions_) {
  - `ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TopLevelEnv.java:956-958` (ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TopLevelEnv.java): no word to check; reads: } else if (exceptions.containsKey(name)) {
- in the old line, not in the new: `row 811`
- every check passes

## Row 42, rewritten (849 characters)
- lengths: row 849 of 1,200, claim 155 of 300, notes 512 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic/components/source-code.tex:86-88` (Specification-1.0-frozen/basic/components/source-code.tex): no word to check; reads: \emph{SimpleName} &::=& \emph{Id} \\
  - `ProjectFortress/src/com/sun/fortress/parser/Identifier.rats:95-104` (ProjectFortress/src/com/sun/fortress/parser/Identifier.rats): no word to check; reads: IdOrOpOrAnonymousName SimpleName =
  - `ProjectFortress/src/com/sun/fortress/parser/Parameter.rats:129` (ProjectFortress/src/com/sun/fortress/parser/Parameter.rats): no word to check; reads: / SUM  { yyValue=NodeFactory.makeOpBig(createSpan(yyStart,yyCount), "BIG +"); }
  - `explorations/sum-probes/p20_except_spelling_sum.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/fable-review-probes/RvwExceptSigma.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `Parameter.rats`, `Parameter.rats:129`
- every check passes

## Row 13, rewritten (1003 characters)
- lengths: row 1003 of 1,200, claim 123 of 300, notes 688 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic/components/source-code.tex:93` (Specification-1.0-frozen/basic/components/source-code.tex): holds AliasedSimpleName; reads: \emph{AliasedSimpleName} &::=& \emph{Id} \options{\KWD{as} \emph{Id}}\\
  - `ProjectFortress/src/com/sun/fortress/parser/Compilation.rats:308-336` (ProjectFortress/src/com/sun/fortress/parser/Compilation.rats): no word to check; reads: private AliasedSimpleName AliasedSimpleName =
  - `explorations/alias-units-probes/p12_import_arrow.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/compile-ladder/rung-export-var/probes/skeptic/SkAlias.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/alias-units-probes/p10_import_as.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `Compilation.rats`, `Compilation.rats:308`, `skeptic-differentials.txt`, `skeptic-differentials.txt:20-28`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 496: row 496: rewritten (1191 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 499: row 499: rewritten (1155 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 538: row 538: rewritten (1183 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 699: row 699: rewritten (1075 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 813: row 813: rewritten (1070 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 814: row 814: rewritten (1198 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 42: row 42: rewritten (849 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 13: row 13: rewritten (1003 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 8 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 8 lines, 0 failing, every check passes.
