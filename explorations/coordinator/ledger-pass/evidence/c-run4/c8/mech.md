# Mechanical check of c8, the writer's files, base c124c6b65

## Row 896, rewritten (992 characters)
- lengths: row 992 of 1,200, claim 216 of 300, notes 673 of 700
- reproducer `none`: exists
- citations:
  - `Library/System.fss:51` (Library/System.fss): holds getProperty, systemOps.getProperty; reads: getProperty(name:FlatString, defaultValue:FlatString):String = builtinPrimitive("com.sun.fortress.nativeHelpers.systemOps.getProperty")
  - `nativeHelpers/systemOps.java:20-21` (ProjectFortress/src/com/sun/fortress/nativeHelpers/systemOps.java): holds getProperty, ProjectProperties.get; reads: public static String getProperty(String what, String ifMissing) {
  - `repository/ProjectProperties.java:207-208` (ProjectFortress/src/com/sun/fortress/repository/ProjectProperties.java): words moved: System.getProperty at :27,36,80; reads: static final public String get(String s, String ifMissing, boolean null_ok) {
  - `useful/StringMap.java:164` (ProjectFortress/src/com/sun/fortress/useful/StringMap.java): holds getProperty, System.getProperty; reads: return System.getProperty(s);
  - `interpreter/glue/StaticNativeApp.java:252-257` (ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java): holds RuntimeException; reads: catch (InvocationTargetException e) {
  - `Library/System.fss:52-56` (Library/System.fss): holds asFlatString; reads: getProperty(name:String, defaultValue:String):String =
- in the old line, not in the new: nothing
- every check passes

## Row 368, rewritten (1003 characters)
- lengths: row 1003 of 1,200, claim 186 of 300, notes 700 of 700
- reproducer `none`: exists
- citations:
  - `compiler/nativeInterface/FortressTransformer.java:53` (ProjectFortress/src/com/sun/fortress/compiler/nativeInterface/FortressTransformer.java): words moved: FortressTransformer at :32; reads: cr.accept(fa, 0);
  - `FortressMethodAdapter.java:215-225` (ProjectFortress/src/com/sun/fortress/compiler/nativeInterface/FortressMethodAdapter.java): holds <init>, <clinit>; reads: public MethodVisitor visitMethod(int access, String name, String desc,
  - `FortressMethodAdapter.java:250-258` (ProjectFortress/src/com/sun/fortress/compiler/nativeInterface/FortressMethodAdapter.java): holds toImplFFFF; reads: private SignatureAndConverter toImplFFFF(String jvmArgType, String method_name, boolean isResultType) {
- in the old line, not in the new: nothing
- every check passes

## Row 812, rewritten (1030 characters)
- lengths: row 1030 of 1,200, claim 243 of 300, notes 633 of 700
- reproducer `none`: exists
- citations:
  - `scala_src/useful/STypesUtil.scala:1587` (ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala): no word to check; reads: analyzer.lteq(tt2, tt) && !analyzer.lteq(tt, tt2)) {
  - `compiler/codegen/CodeGen.java:488` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): no word to check; reads: toConsider = STypesUtil.properlyInheritedMethodsNotIdenticallyCovered(id, typeAnalyzer);
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:485`, `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1587`, `row 775`, `row 809`
- every check passes

## Row 818, rewritten (1145 characters)
- lengths: row 1145 of 1,200, claim 284 of 300, notes 691 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fss:1496` (Library/FortressLibrary.fss): no word to check; reads: getter asString(): String = "seq(" (self asif Generator[\E\]).asString ")"
  - `compiler/codegen/CodeGen.java:1675-1677` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): no word to check; reads: public void defaultCase(Node x) {
  - `interpreter/evaluator/Evaluator.java:109` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java): no word to check; reads: public FValue forAsIfExpr(AsIfExpr x) {
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1672`
- every check passes

## Row 819, rewritten (1132 characters)
- lengths: row 1132 of 1,200, claim 265 of 300, notes 700 of 700
- reproducer `none`: exists
- citations:
  - `compiler/codegen/CodeGen.java:2874` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): no word to check; reads: throw new Error("\n"+NodeUtil.getSpan(body)+": Error trying to close method scope.\n" + mv.getText(),t);
  - `Library/FortressLibrary.fss:4199` (Library/FortressLibrary.fss): words moved: = l# at :4241,4242,4243; reads: opr (x:(ZZ32,ZZ32)): : LeftRange[\(ZZ32,ZZ32)\] = x#
  - `Library/FortressLibrary.fss:4200` (Library/FortressLibrary.fss): words moved: = l# at :4241,4242,4243; reads: opr (x:(ZZ32,ZZ32,ZZ32)): : LeftRange[\(ZZ32,ZZ32,ZZ32)\] = x#
  - `Library/FortressLibrary.fss:4242` (Library/FortressLibrary.fss): words moved: = x# at :4198,4199,4200; reads: opr (l:(ZZ32,ZZ32)):: : LeftRange[\(ZZ32,ZZ32)\] = l#
  - `Library/FortressLibrary.fss:4243` (Library/FortressLibrary.fss): words moved: = x# at :4198,4199,4200; reads: opr (l:(ZZ32,ZZ32,ZZ32)):: : LeftRange[\(ZZ32,ZZ32,ZZ32)\] = l#
- in the old line, not in the new: `:4194`, `:4236`, `:4237`, `Library/FortressLibrary.fss:4193`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2821`
- every check passes

## Row 822, rewritten (1097 characters)
- lengths: row 1097 of 1,200, claim 291 of 300, notes 638 of 700
- reproducer `none`: exists
- citations:
  - `Library/List.fss:93` (Library/List.fss): words moved: typecase at :94,369; reads: private app[\T,E extends T,F extends T\](a:List[\E\], b:List[\F\]): List[\T\] =
  - `Library/List.fss:252` (Library/List.fss): holds object ArrayList[\E\]; reads: object ArrayList[\E\]( underlying : ImmutableArray[\E,ZZ32\],
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:488` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): no word to check; reads: toConsider = STypesUtil.properlyInheritedMethodsNotIdenticallyCovered(id, typeAnalyzer);
- in the old line, not in the new: `List.fss`, `List.fss:252`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:485`, `row 557`
- every check passes

## Row 895, rewritten (1056 characters)
- lengths: row 1056 of 1,200, claim 260 of 300, notes 692 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/nativeHelpers/systemOps.java:29` (ProjectFortress/src/com/sun/fortress/nativeHelpers/systemOps.java): holds getArgs; reads: public static FStringVector getArgs() {
  - `compiler/NamingCzar.java:339-340` (ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java): words moved: FortressBuiltin at :369,466,470; reads: } else if (s.equals("Lcom/sun/fortress/compiler/runtimeValues/FStringVector;")) {
  - `Library/FlatString.fss:25-26` (Library/FlatString.fss): no word to check; reads: private natLineSeparator(): String = builtinPrimitive(
  - `Library/System.fss:41` (Library/System.fss): words moved: System at :12,15; getProperty at :51,52,54; reads: getEnvironment(name:FlatString, defaultValue:FlatString):String = builtinPrimitive("com.sun.fortress.nativeHelpers.systemOps.getEnvironment"
  - `Library/System.fss:51` (Library/System.fss): words moved: System at :12,15; getEnvironment at :41,42,44; reads: getProperty(name:FlatString, defaultValue:FlatString):String = builtinPrimitive("com.sun.fortress.nativeHelpers.systemOps.getProperty")
- in the old line, not in the new: nothing
- every check passes

## Row 340, rewritten (1154 characters)
- lengths: row 1154 of 1,200, claim 182 of 300, notes 698 of 700
- reproducer `ProjectFortress/compiler_tests/XXXTypecaseBodyCoerceRungG.test`: exists
- citations:
  - `Specification-1.0-frozen/basic/expressions/typecase.tex:53-55` (Specification-1.0-frozen/basic/expressions/typecase.tex): no word to check; reads: \begin{Grammar}
  - `CodeGen.java:3477-3481` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): no word to check; reads: private void methodReturnAndFinish() {
  - `CodeGen.java:2874` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): no word to check; reads: throw new Error("\n"+NodeUtil.getSpan(body)+": Error trying to close method scope.\n" + mv.getText(),t);
- in the old line, not in the new: `:2820-2821`, `CodeGen.java:3425-3427`
- every check passes

## Row 498, rewritten (911 characters)
- lengths: row 911 of 1,200, claim 174 of 300, notes 622 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/PatternMatchingDesugarer.scala:668-671` (ProjectFortress/src/com/sun/fortress/compiler/PatternMatchingDesugarer.scala): holds checkClause; reads: def checkClause(c: TypecaseClause) = 	{
  - `Specification/basic/expressions/typecase.tex:15` (Specification/basic/expressions/typecase.tex): no word to check; reads: \note{This section should be revised according to the changes in the pattern matching proposal.}
  - `ProjectFortress/compiler_tests/patternMatching1.fss:39` (ProjectFortress/compiler_tests/patternMatching1.fss): no word to check; reads: Leaf(i) => i
  - `explorations/compile-ladder/rung-generic-runtime/probes/skeptic/SkPatternBind.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `SkPatternBind.fss`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 896: row 896: rewritten (992 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 368: row 368: rewritten (1003 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 812: row 812: rewritten (1030 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 818: row 818: rewritten (1145 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 819: row 819: rewritten (1132 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 822: row 822: rewritten (1097 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 895: row 895: rewritten (1056 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 340: row 340: rewritten (1154 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 498: row 498: rewritten (911 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 9 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 9 lines, 0 failing, every check passes.
