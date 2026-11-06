# Mechanical check of c16, the judge's files, base c124c6b65

## Row 365, rewritten (1155 characters)
- lengths: row 1155 of 1,200, claim 230 of 300, notes 628 of 700
- reproducer `ProjectFortress/compiler_tests/XXXUnionReturnRungS.test`: exists
- citations:
  - `Specification-1.0-frozen/basic/expressions/if.tex:66-67` (Specification-1.0-frozen/basic/expressions/if.tex): no word to check; reads: The type of an \KWD{if} expression is the union of the types of the
  - `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:1444-1447` (ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java): words moved: NamingCzar.jvmTypeDesc at :850,858; java/lang/Object at :206,352,983; reads: public String forUnionType(UnionType t) {
  - `explorations/compile-ladder/rung-default-rendering/probes/skeptic/SkUnionReturn.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:1398-1401`, `SkUnionReturn.fss`, `SkUnionReturnDeclared.fss`
- every check passes

## Row 732, rewritten (1066 characters)
- lengths: row 1066 of 1,200, claim 223 of 300, notes 700 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:968` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): words moved: dumpMethodChaining at :915,4680,5411; reads: if (!fnl.body().isSome()) {
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:934-940` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): words moved: dumpMethodChaining at :915,4680,5411; reads: if (extendsClause.size() == 0 || !(extendsClause.get(0).getBaseType() instanceof TraitType)) {
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:965`
- every check passes

## Row 849, rewritten (1181 characters)
- lengths: row 1181 of 1,200, claim 285 of 300, notes 685 of 700
- reproducer `ProjectFortress/compiler_tests/XXXNativeHelperVarargsCompiled.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:117` (ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java): no word to check; reads: if (p.getVarargsType().isSome()) return f;
  - `ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:30-31` (ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java): no word to check; reads: * declared type, as each transfer's, gets none.  A declaration with a varargs
  - `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:14-29` (ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi): holds builtinPrimitive; reads: (** The %builtinPrimitive% function is actually recognized as a special piece
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:105`, `explorations/coordinator/CLIMB-BATCH-23.md`, `explorations/coordinator/CLIMB-BATCH-23.md:139`, `row 847`
- every check passes

## Row 865, rewritten (1059 characters)
- lengths: row 1059 of 1,200, claim 265 of 300, notes 553 of 700
- reproducer `ProjectFortress/compiler_tests/XXXNativeHelperLocalFunctionCompiled.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:59` (ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java): no word to check; reads: for (Decl d : c.getDecls()) decls.add(decl(d, null, aliases));
  - `ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:75-87` (ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java): no word to check; reads: private static Decl decl(Decl d, String owner, Aliases aliases) {
  - `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:14-29` (ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi): holds builtinPrimitive; reads: (** The %builtinPrimitive% function is actually recognized as a special piece
- in the old line, not in the new: `:66-85`, `ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:51`
- every check passes

## Row 885, rewritten (1010 characters)
- lengths: row 1010 of 1,200, claim 299 of 300, notes 537 of 700
- reproducer `ProjectFortress/compiler_tests/XXXNativeHelperOverloadedNN32Compiled.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:135-145` (ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java): no word to check; reads: Method jm = soleMethod(s.substring(0, m), s.substring(m + 1), args.size());
  - `ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:196-206` (ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java): no word to check; reads: /** The one public static method of that name and arity, or null. */
- in the old line, not in the new: nothing
- every check passes

## Row 886, rewritten (1093 characters)
- lengths: row 1093 of 1,200, claim 270 of 300, notes 656 of 700
- reproducer `ProjectFortress/compiler_tests/XXXNativeHelperOwnCharCompiled.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:169-173` (ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java): no word to check; reads: private static String simpleName(Object t) {
  - `ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:186-188` (ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java): words moved: UnsignedLong at :189,190,191; reads: if (desc.equals("I") && (declared.equals("Char") || declared.equals("Character")))
  - `ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:189-190` (ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java): words moved: Char at :24,133,186; Character at :24,186,187; reads: /* UnsignedLong, walk's object of NN64, is an NN64: its self takes the argument transfer. */
- in the old line, not in the new: `NN32`, `compiler/BuiltinPrimitiveRewriter.java`, `compiler/BuiltinPrimitiveRewriter.java:169-173`
- every check passes

## Row 288, rewritten (1023 characters)
- lengths: row 1023 of 1,200, claim 256 of 300, notes 663 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressSyntax.fsi:14` (Library/FortressSyntax.fsi): holds FortressAst; reads: import FortressAst.{...}
  - `Library/FortressAst.fsi:6` (Library/FortressAst.fsi): words moved: FortressAst at :2,4; reads: import FortressLibrary.{...} except ExtentRange
  - `WellKnownNames.java:116-129` (ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java): words moved: FortressLibrary at :44,133; reads: */
  - `GraphRepository.java:815-823` (ProjectFortress/src/com/sun/fortress/repository/GraphRepository.java): no word to check; reads: private Component syntaxExpand(ComponentGraphNode node) throws FileNotFoundException, IOException {
  - `PhaseOrder.java:137-147` (ProjectFortress/src/com/sun/fortress/compiler/phases/PhaseOrder.java): no word to check; reads: static public final PhaseOrder[] compilerPhaseOrder = {
- in the old line, not in the new: `BigReduction`, `Comprehension`, `FortressAst.fsi`, `FortressAst.fsi:6`, `LexicographicOrder`, `MonoidReduction`, `WellKnownNames.java:114-127`
- every check passes

## Row 290, rewritten (1034 characters)
- lengths: row 1034 of 1,200, claim 235 of 300, notes 696 of 700
- reproducer `none`: exists
- citations:
  - `scala_src/typechecker/impls/Operators.scala:243` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Operators.scala): words moved: isParenthesized at :81; reads: syntaxError(item, "Argument to function must be parenthesized.")
  - `explorations/perf-probes/grammar-compile/shim/MatrixC.fsi`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `row 243`, `row 288`, `scala_src/typechecker/impls/Operators.scala:237`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 365: row 365: rewritten (1155 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 732: row 732: rewritten (1066 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 849: row 849: rewritten (1181 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 865: row 865: rewritten (1059 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 885: row 885: rewritten (1010 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 886: row 886: rewritten (1093 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 288: row 288: rewritten (1023 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 290: row 290: rewritten (1034 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 8 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 8 lines, 0 failing, every check passes.
