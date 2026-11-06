# Mechanical check of c37, the writer's files, base c124c6b65

## Row 113, rewritten (955 characters)
- lengths: row 955 of 1,200, claim 140 of 300, notes 687 of 700
- reproducer `none`: exists
- citations:
  - `FOrdinaryObject.java:46-57` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FOrdinaryObject.java): words moved: FTypeObject at :16,23,25; reads: public boolean seqv(FValue v) {
  - `FTypeObject.java:53-63` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTypeObject.java): words moved: FTypeObject at :27,46; reads: this.declaredMembersOf = new BetterEnv(at);
  - `Library/FortressLibrary.fss:1640` (Library/FortressLibrary.fss): holds Just[\T\](x:T); reads: value object Just[\T\](x:T) extends Maybe[\T\]
- in the old line, not in the new: `Library/FortressLibrary.fss:1503`
- every check passes

## Row 126, rewritten (716 characters)
- lengths: row 716 of 1,200, claim 87 of 300, notes 411 of 700
- reproducer `none`: exists
- citations:
  - `Specification/basic/traits.tex:438-439` (Specification/basic/traits.tex): no word to check; reads: \note{Getters must always be called with the special syntax:
  - `explorations/gap-ledger-probes/g24.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: nothing
- every check passes

## Row 320, rewritten (1113 characters)
- lengths: row 1113 of 1,200, claim 179 of 300, notes 651 of 700
- reproducer `ProjectFortress/compiler_tests/XXXExportVarRungXLinked.test`: exists
- citations:
  - `Specification-1.0-frozen/basic/components/overview.tex:33-35` (Specification-1.0-frozen/basic/components/overview.tex): no word to check; reads: External references are resolved by linking components together:
  - `Operators.scala:467` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Operators.scala): no word to check; reads: if (!isMutableName(id)) {
  - `CodeGen.java:397` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): no word to check; reads: packageAndClassName = NamingCzar.javaPackageClassForApi(c.getName());
  - `CodeGen.java:4055-4115` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): words moved: NamingCzar.jvmClassForToplevelDecl at :6240,6258,6320; reads: private Pair<String, String> functionalRefToPackageClassAndMethod(
  - `NamingCzar.java:1699-1702` (ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java): no word to check; reads: public static String jvmClassForToplevelDecl(IdOrOp x, String api) {
  - `linker/Linker.java:72-76` (ProjectFortress/src/com/sun/fortress/linker/Linker.java): no word to check; reads: if (s == null) s = st.getDefaultMap().get(api.getText());;
- in the old line, not in the new: `:3779-3839`, `CodeGen.java:394`, `NamingCzar.java:1653-1656`, `Operators.scala:444`
- every check passes

## Row 830, rewritten (807 characters)
- lengths: row 807 of 1,200, claim 242 of 300, notes 405 of 700
- reproducer `Library/Avl.fss`: exists
- citations:
  - `Library/Avl.fss:103` (Library/Avl.fss): no word to check; reads: chk(root,self.left.check(root,key()),self.right.check(key(),root))
- in the old line, not in the new: nothing
- every check passes

## Row 842, rewritten (982 characters)
- lengths: row 982 of 1,200, claim 266 of 300, notes 496 of 700
- reproducer `ProjectFortress/compiler_tests/XXXExportFieldByGetter.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:875-889` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala): words moved: equalAbstractMember at :834,860; reads: private def equalMember(inAPI: Decl, inComp: Decl): Boolean =
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:860-872` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala): words moved: equalMember at :793,833,843; reads: private def equalAbstractMember(inAPI: Decl, inComp: Decl): Boolean =
- in the old line, not in the new: `c3c22817c`, `row 801`, `row 816`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 113: row 113: rewritten (955 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 126: row 126: rewritten (716 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 320: row 320: rewritten (1113 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 830: row 830: rewritten (807 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 842: row 842: rewritten (982 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 5 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 5 lines, 0 failing, every check passes.
