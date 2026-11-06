# Mechanical check of c18, the writer's files, base c124c6b65

## Row 864, rewritten (1080 characters)
- lengths: row 1080 of 1,200, claim 268 of 300, notes 645 of 700
- reproducer `ProjectFortress/tests/NativeHelperUncarriedSelfGenericObjectWalk.fss`: exists
- citations:
  - `interpreter/glue/StaticNativeApp.java:189-193` (ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java): no word to check; reads: if (declarer != null) {
  - `interpreter/evaluator/values/MethodClosure.java:36` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/MethodClosure.java): no word to check; reads: super(within, fndef, false, definer);
- in the old line, not in the new: `interpreter/glue/StaticNativeApp.java:137-141`
- every check passes

## Row 883, rewritten (979 characters)
- lengths: row 979 of 1,200, claim 200 of 300, notes 682 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/Parser.java:157-159` (ProjectFortress/src/com/sun/fortress/compiler/Parser.java): no word to check; reads: if (BuiltinPrimitiveRewriter.enabled() && file.getName().endsWith(ProjectProperties.COMP_SOURCE_SUFFIX)
  - `ProjectFortress/src/com/sun/fortress/repository/GraphRepository.java:1025` (ProjectFortress/src/com/sun/fortress/repository/GraphRepository.java): words moved: macroParse at :823; reads: return Parser.importCollector(fdot);
  - `compiler/Parser.java:117` (ProjectFortress/src/com/sun/fortress/compiler/Parser.java): words moved: macroParse at :111; reads: CompilationUnit cu = importCollector(f);
  - `compiler/Parser.java:132` (ProjectFortress/src/com/sun/fortress/compiler/Parser.java): words moved: macroParse at :111; reads: return new Result(parseFileConvertExn(f),
- in the old line, not in the new: `:132`, `Parser.java`, `Parser.java:117`
- every check passes

## Row 888, rewritten (1051 characters)
- lengths: row 1051 of 1,200, claim 250 of 300, notes 601 of 700
- reproducer `ProjectFortress/compiler_tests/XXXNestedTryInnerCatch.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2033` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): no word to check; reads: mv.visitTryCatchBlock(l0,l1,l2, "com/sun/fortress/compiler/runtimeValues/FException");
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2032`
- every check passes

## Row 892, rewritten (878 characters)
- lengths: row 878 of 1,200, claim 269 of 300, notes 460 of 700
- reproducer `none`: exists
- citations:
  - `explorations/compile-ladder/rung-codegen-walls/SKEPTIC.md:28` (explorations/compile-ladder/rung-codegen-walls/SKEPTIC.md): no word to check; reads: - `TestCallDiff`: `run()` calls `test t()`. The rung's compiled run and walk on both codes print 'in test', 'DONE'.
- in the old line, not in the new: `TestCallDiff.fss`, `bin/fortress compile TestCallDiff.fss && bin/fortress run TestCallDiff`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 864: row 864: rewritten (1080 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 883: row 883: rewritten (979 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 888: row 888: rewritten (1051 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 892: row 892: rewritten (878 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 4 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 4 lines, 0 failing, every check passes.
