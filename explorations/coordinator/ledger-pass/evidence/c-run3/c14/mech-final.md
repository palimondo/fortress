# Mechanical check of c14, the judge's files, base c124c6b65

## Row 304, rewritten (1155 characters)
- lengths: row 1155 of 1,200, claim 235 of 300, notes 692 of 700
- reproducer `ProjectFortress/compiler_tests/XXXLocalFunctionGenericCompiled.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3588-3592` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): no word to check; reads: throw sayWhat(f, "Can't compile a local function with static parameters of its own yet");
- in the old line, not in the new: nothing
- every check passes

## Row 624, rewritten (1147 characters)
- lengths: row 1147 of 1,200, claim 189 of 300, notes 695 of 700
- reproducer `ProjectFortress/compiler_tests/XXXVarargsCodeGeneration.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:1308` (ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java): no word to check; reads: throw new CompilerError(t,"Can't compile VarArgs yet");
  - `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:1318` (ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java): no word to check; reads: throw new CompilerError(t,"Can't compile VarArgs yet");
  - `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:1458` (ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java): no word to check; reads: throw new CompilerError(t,"Can't compile VarArgs yet");
  - `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:1569` (ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java): no word to check; reads: throw new CompilerError(t,"Can't compile VarArgs yet");
  - `CodeGen.java:3597` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): no word to check; reads: throw new CompilerError(f, "Can't compile VarArgs yet");
  - `NamingCzar.java:945` (ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java): no word to check; reads: buf.append(jvmBoxedTypeDesc((com.sun.fortress.nodes.Type) p.getIdType().unwrap(), ifNone));
  - `Library/String.fss:337` (Library/String.fss): holds test stringifyChars(); reads: test stringifyChars():() = do
- in the old line, not in the new: `:1272`, `:1412`, `:1523`, `:899`, `CodeGen.dumpTraitMethodSigs`, `compiler/NamingCzar.java`, `compiler/NamingCzar.java:1262`
- every check passes

## Row 701, rewritten (1108 characters)
- lengths: row 1108 of 1,200, claim 258 of 300, notes 625 of 700
- reproducer `ProjectFortress/compiler_tests/XXXFunctionContractCodeGeneration.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3023` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): words moved: forFnDecl at :2954,2981; reads: header.getContract().isNone() && // no contract
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:4384` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): words moved: forFnDecl at :2954,2981; reads: header.getContract().isNone() &&      // no contract
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:5303` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): words moved: forFnDecl at :2954,2981; reads: header.getContract().isNone() &&      // no contract
- in the old line, not in the new: `:4109`, `:5029`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2971`, `WhereBoundMethodCompiled`, `WhereBoundObjectCompiled`, `WhereBoundTraitMethodCompiled`, `compiler_tests/WhereBoundFunctionCompiled`, `row 823`
- every check passes

## Row 867, rewritten (1074 characters)
- lengths: row 1074 of 1,200, claim 259 of 300, notes 600 of 700
- reproducer `ProjectFortress/compiler_tests/XXXWhereVariableCallCompiled.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/FnNameInfo.java:99` (ProjectFortress/src/com/sun/fortress/compiler/codegen/FnNameInfo.java): no word to check; reads: static_params = x.getHeader().getStaticParams();
- in the old line, not in the new: `row 749`
- every check passes

## Row 25, rewritten (1063 characters)
- lengths: row 1063 of 1,200, claim 226 of 300, notes 669 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/LibraryBuiltin/NatReflect.fsi:22-31` (ProjectFortress/LibraryBuiltin/NatReflect.fsi): no word to check; reads: trait NatParam
  - `Library/FortressLibrary.fss:2259` (Library/FortressLibrary.fss): no word to check; reads: array[\E\](x:ZZ32):Array[\E,ZZ32\] = __arr1(__thrower[\E\],reflect(x))
  - `NatReflect.fss:33-35` (ProjectFortress/LibraryBuiltin/NatReflect.fss): words moved: __refl' at :42,45,47; reads: (* Inner loop of reflect, hoisted to top level because of incomplete
  - `NatReflect.fss:38-40` (ProjectFortress/LibraryBuiltin/NatReflect.fss): no word to check; reads: * Really this just proves that it can be done without extending the
  - `explorations/libvector-probes/p09_runtime_size.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/libvector-probes/p22_runtime_sized.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `63e420a33`, `Library/FortressLibrary.fss:2247`, `p22_runtime_sized.fss`
- every check passes

## Row 307, rewritten (1193 characters)
- lengths: row 1193 of 1,200, claim 226 of 300, notes 677 of 700
- reproducer `ProjectFortress/compiler_tests/XXXNatBoolChecker.test`: exists
- citations:
  - `STypesUtil.scala:585-606` (ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala): holds makeInferenceArg; reads: def makeInferenceArg(sparam: StaticParam): StaticArg = sparam.getKind match {
- in the old line, not in the new: `9d323883f`
- every check passes

## Row 764, rewritten (1000 characters)
- lengths: row 1000 of 1,200, claim 236 of 300, notes 556 of 700
- reproducer `ProjectFortress/compiler_tests/XXXBoolStaticArgMethodWritten.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/FnNameInfo.java:185-206` (ProjectFortress/src/com/sun/fortress/compiler/codegen/FnNameInfo.java): words moved: TraitType at :175; reads: public ArrowType normalizedSchema(Type at) {
  - `scala_src/typechecker/impls/Functionals.scala:1152` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala): no word to check; reads: val modifiedSchema = Some(new FnNameInfo(bestFnl.get.asInstanceOf[DeclaredMethod].originalMethod, null).normalizedSchema(bestOver.getSchema.
  - `FnNameInfo.java:168-182` (ProjectFortress/src/com/sun/fortress/compiler/codegen/FnNameInfo.java): holds boundsFor, TraitType; reads: public StaticArg boundsFor(StaticParam sp) {
  - `compiler/typechecker/StaticTypeReplacer.java:121-131` (ProjectFortress/src/com/sun/fortress/compiler/typechecker/StaticTypeReplacer.java): words moved: bool at :65,106,158; BoolRef at :226; reads: private Node updateNode(Node that, final IdOrOpOrAnonymousName name) {
- in the old line, not in the new: `:168-182`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/FnNameInfo.java:190-206`, `StaticTypeReplacer.java`, `StaticTypeReplacer.java:121-131`, `scala_src/typechecker/impls/Functionals.scala:1094`
- every check passes

## Row 352, rewritten (1074 characters)
- lengths: row 1074 of 1,200, claim 212 of 300, notes 696 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3022` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): no word to check; reads: //	    header.getThrowsClause().isNone() && // no throws clause
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:4383` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): no word to check; reads: header.getThrowsClause().isNone() &&  // no throws clause
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:5302` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): no word to check; reads: header.getThrowsClause().isNone() &&  // no throws clause
  - `explorations/compile-ladder/rung-tryatomic/probes/skeptic/SkepThrowsClause.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `:4108`, `:5028`, `CodeGen.java`, `CodeGen.java:2970`, `SkepThrowsClause.fss`
- every check passes

## Row 781, rewritten (1072 characters)
- lengths: row 1072 of 1,200, claim 245 of 300, notes 666 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TypeDisambiguator.java:112-113` (ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TypeDisambiguator.java): holds Option.<List<Type>>none(), Option.<Contract>none(); reads: Option.<List<Type>>none(),
  - `ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TypeDisambiguator.java:137-138` (ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TypeDisambiguator.java): holds Option.<List<Type>>none(), Option.<Contract>none(); reads: Option.<List<Type>>none(),
  - `ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TypeDisambiguator.java:100-101` (ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TypeDisambiguator.java): words moved: Option.<List<Type>>none() at :112,137; Option.<Contract>none() at :113,138; reads: List<TraitTypeWhere> before = NodeUtil.getExtendsClause(that);
  - `ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TypeDisambiguator.java:125-126` (ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TypeDisambiguator.java): words moved: Option.<List<Type>>none() at :112,137; Option.<Contract>none() at :113,138; reads: /**
  - `ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TypeDisambiguator.java:161-162` (ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TypeDisambiguator.java): words moved: Option.<List<Type>>none() at :112,137; Option.<Contract>none() at :113,138; reads: v.recurOnOptionOfListOfType(NodeUtil.getThrowsClause(that)),
  - `Decls.scala:139-142` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala): no word to check; reads: val newContract = contract match {
- in the old line, not in the new: nothing
- every check passes

## Row 761, rewritten (990 characters)
- lengths: row 990 of 1,200, claim 284 of 300, notes 514 of 700
- reproducer `ProjectFortress/tests/XXXBoolStaticArgMethod.fss`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/nodes_util/NodeComparator.java:410-428` (ProjectFortress/src/com/sun/fortress/nodes_util/NodeComparator.java): holds BoolArg; reads: private static int subtypeCompareTo(StaticArg left, StaticArg right) {
  - `FTraitOrObjectOrGeneric.java:78` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTraitOrObjectOrGeneric.java): no word to check; reads: SortedSet<FnDecl> defs = Useful.<Decl, FnDecl>filteredSortedSet(members, new Fn<Decl, FnDecl>() {
- in the old line, not in the new: `:78`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 304: row 304: rewritten (1155 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 624: row 624: rewritten (1147 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 701: row 701: rewritten (1108 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 867: row 867: rewritten (1074 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 25: row 25: rewritten (1063 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 307: row 307: rewritten (1193 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 764: row 764: rewritten (1000 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 352: row 352: rewritten (1074 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 781: row 781: rewritten (1072 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 761: row 761: rewritten (990 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 10 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 10 lines, 0 failing, every check passes.
