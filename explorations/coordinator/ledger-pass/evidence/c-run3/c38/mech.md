# Mechanical check of c38, the writer's files, base c124c6b65

## Row 5, rewritten (757 characters)
- lengths: row 757 of 1,200, claim 98 of 300, notes 453 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/parser/Symbol.rats:252` (ProjectFortress/src/com/sun/fortress/parser/Symbol.rats): words moved: Accumulator at :259,260; reads: transient Op SUM = "SUM"
  - `ProjectFortress/src/com/sun/fortress/parser/Symbol.rats:260-261` (ProjectFortress/src/com/sun/fortress/parser/Symbol.rats): holds SUM, Accumulator; reads: transient Op Accumulator =
  - `explorations/sum-probes/p13_unicode_sigma.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: nothing
- every check passes

## Row 81, rewritten (696 characters)
- lengths: row 696 of 1,200, claim 55 of 300, notes 476 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/appendices/grammars/concrete-syntax.tex:972` (Specification-1.0-frozen/appendices/grammars/concrete-syntax.tex): words moved: label at :13,1009; reads: &::=& \KWD{exit} \option{\emph{Id}} \options{\KWD{with} \emph{Expr}} \\
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1674-1676` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): holds defaultCase; reads: 
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1558-1561` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): words moved: defaultCase at :1675; reads: private CompilerError sayWhat(ASTNode x) {
  - `explorations/compiler-probes/p31.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: nothing
- every check passes

## Row 92, rewritten (1076 characters)
- lengths: row 1076 of 1,200, claim 189 of 300, notes 633 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic/declarations.tex:476-533` (Specification-1.0-frozen/basic/declarations.tex): no word to check; reads: One declaration \emph{shadows} another for a name in a namespace
  - `Specification-1.0-frozen/basic/declarations.tex:482` (Specification-1.0-frozen/basic/declarations.tex): no word to check; reads: The first declaration is a field or dotted method declaration
  - `Specification-1.0-frozen/basic/declarations.tex:533` (Specification-1.0-frozen/basic/declarations.tex): no word to check; reads: No other shadowing is permitted in a Fortress program.
  - `ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/ExprDisambiguator.scala:745-762` (ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/ExprDisambiguator.scala): holds checkForShadowingVar; reads: private def checkForShadowingVar(v: Id) = {
  - `explorations/run-c3/probes/g164_api_param_name/UseG164.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/gap-ledger-probes/g21.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `epsilon`, `explorations/run-b/probes/c16_model_spellings.fss`, `object Adam(epsilon: RR64)`, `row 168`
- every check passes

## Row 147, rewritten (1096 characters)
- lengths: row 1096 of 1,200, claim 245 of 300, notes 641 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic/declarations.tex:476-533` (Specification-1.0-frozen/basic/declarations.tex): words moved: big at :600; reads: One declaration \emph{shadows} another for a name in a namespace
  - `Specification-1.0-frozen/basic/declarations.tex:533` (Specification-1.0-frozen/basic/declarations.tex): words moved: big at :600; reads: No other shadowing is permitted in a Fortress program.
  - `ExprDisambiguator.scala:745-762` (ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/ExprDisambiguator.scala): no word to check; reads: private def checkForShadowingVar(v: Id) = {
  - `Library/FortressLibrary.fsi:1767` (Library/FortressLibrary.fsi): no word to check; reads: t(): Matrix[\T,s1,s0\]
  - `explorations/gap-ledger-probes/g29.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `Library/FortressLibrary.fsi:590` (Library/FortressLibrary.fsi): holds big(self):ZZ; reads: big(self):ZZ
  - `Library/FortressLibrary.fsi:648` (Library/FortressLibrary.fsi): holds big(self):ZZ; reads: big(self):ZZ
  - `explorations/run-c/probes/g147_param_t.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `6:9`, `7:9`, `8:11`, `:636`, `Library/FortressLibrary.fsi:580`, `row 168`
- every check passes

## Row 167, rewritten (1057 characters)
- lengths: row 1057 of 1,200, claim 233 of 300, notes 613 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic/declarations.tex:476-533` (Specification-1.0-frozen/basic/declarations.tex): holds nat; reads: One declaration \emph{shadows} another for a name in a namespace
  - `Specification-1.0-frozen/basic/declarations.tex:533` (Specification-1.0-frozen/basic/declarations.tex): words moved: nat at :214,376,491; reads: No other shadowing is permitted in a Fortress program.
  - `ExprDisambiguator.scala:761` (ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/ExprDisambiguator.scala): no word to check; reads: error("Variable " + v + " is already declared.", v)
  - `explorations/run-c3/probes/att_g_staticname.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `att_g_staticname.fss`, `att_g_staticname.fss:6:38: Variable q is already declared.`, `row 168`
- every check passes

## Row 322, rewritten (1059 characters)
- lengths: row 1059 of 1,200, claim 182 of 300, notes 659 of 700
- reproducer `none`: exists
- citations:
  - `CodeGen.java:5028-5036` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): no word to check; reads: mv.visitVarInsn(ALOAD, mv.getThis());
  - `CodeGen.java:1736-1764` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): holds startOver; reads: public void forAtomicBlock(Block x) {
- in the old line, not in the new: `:1733-1761`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:4753-4761`, `SK13LocalArmAtomic.fss`, `SK7TaskNest.fss`
- every check passes

## Row 324, rewritten (1061 characters)
- lengths: row 1061 of 1,200, claim 224 of 300, notes 690 of 700
- reproducer `none`: exists
- citations:
  - `CodeGen.java:1742-1745` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): holds TransactionAbortException; reads: String type = "com/sun/fortress/runtimeSystem/TransactionAbortException";
  - `ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:144-149` (ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java): words moved: TransactionAbortException at :129; reads: private Any AncestrialWrite(MutableFValue v) {
  - `ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java:83-86` (ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java): no word to check; reads: public BaseTask(BaseTask parent) {
- in the old line, not in the new: `BaseTask.java`, `BaseTask.java:83-86`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1739-1742`, `SK29ThrowLocalAsString.fss`, `SQ6OrphanTx.fss`, `SQ7ObjThrow.fss`, `Transaction.java`, `Transaction.java:144-149,159-168`
- every check passes

## Row 526, rewritten (1024 characters)
- lengths: row 1024 of 1,200, claim 227 of 300, notes 558 of 700
- reproducer `ProjectFortress/compiler_tests/XXXTryOperandRungE.test`: exists
- citations:
  - `Specification-1.0-frozen/basic/expressions/try.tex:56-64` (Specification-1.0-frozen/basic/expressions/try.tex): no word to check; reads: If an expression in the \KWD{try} block completes abruptly by throwing
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2022` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): no word to check; reads: public void forTry(Try x) {
- in the old line, not in the new: `CodeGen.java`, `CodeGen.java:2019`, `forAtomicBlock`, `generateTaskCompute`
- every check passes

## Row 876, rewritten (1030 characters)
- lengths: row 1030 of 1,200, claim 242 of 300, notes 687 of 700
- reproducer `none`: exists
- citations:
  - `DeterministicRandom.java:52-56` (ProjectFortress/src/com/sun/fortress/nativeHelpers/DeterministicRandom.java): words moved: DeterministicRandom at :19; reads: public static double deterministicRandomDouble(double exclusiveMax) {
  - `ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java:108-111` (ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java): words moved: compute at :149,156; joinOrRun at :35,146; reads: public long makeNewRandom() {
  - `CodeGen.java:5028-5033` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): words moved: joinOrRun at :1667; reads: mv.visitVarInsn(ALOAD, mv.getThis());
  - `ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java:146-177` (ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java): holds compute, joinOrRun; reads: public final void joinOrRun() {
  - `ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java:57-61` (ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java): no word to check; reads: /** Each base task has a depth in the pedigree tree, the value of
- in the old line, not in the new: `BaseTask.java`, `BaseTask.java:146-177`, `BaseTask.java:57-61`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:4753-4757`, `ProjectFortress/src/com/sun/fortress/nativeHelpers/DeterministicRandom.java`, `ProjectFortress/src/com/sun/fortress/nativeHelpers/DeterministicRandom.java:52-56`
- every check passes

## Row 168, a duplicate of row 92
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 5: row 5: rewritten (757 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 81: row 81: rewritten (696 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 92: row 92: rewritten (1076 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 147: row 147: rewritten (1096 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 167: row 167: rewritten (1057 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 322: row 322: rewritten (1059 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 324: row 324: rewritten (1061 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 526: row 526: rewritten (1024 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 876: row 876: rewritten (1030 characters); its earlier line is in fortress-gap-ledger-history.md
    applied duplicate 168: row 168: DUPLICATE of row 92; earlier lines in fortress-gap-ledger-history.md
    apply.py: 10 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 10 lines, 0 failing, every check passes.
