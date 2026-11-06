# Mechanical check of c11, the judge's files, base c124c6b65

## Row 69, rewritten (758 characters)
- lengths: row 758 of 1,200, claim 111 of 300, notes 572 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/Shell.java:455-457` (ProjectFortress/src/com/sun/fortress/Shell.java): no word to check; reads: } else if (what.equals("typecheck")) {
  - `ProjectFortress/src/com/sun/fortress/Shell.java:467-474` (ProjectFortress/src/com/sun/fortress/Shell.java): holds typecheck-old; reads: } else if (what.equals("typecheck-old")) {
  - `ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:229` (ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java): no word to check; reads: throw new Error("The Java version of the type checker is gone now.");
  - `explorations/libvector-probes/p30_capstone.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `:465`, `ProjectFortress/src/com/sun/fortress/Shell.java:453-457`
- every check passes

## Row 74, rewritten (1005 characters)
- lengths: row 1005 of 1,200, claim 184 of 300, notes 646 of 700
- reproducer `none`: exists
- citations:
  - `Library/CompilerLibrary.fsi:178-179` (Library/CompilerLibrary.fsi): words moved: ZZ32Addition at :161; BIG MAX at :181,182; reads: opr BIG +(): ReductionZZ32
  - `Library/CompilerLibrary.fsi:161` (Library/CompilerLibrary.fsi): words moved: opr BIG +() at :178; opr BIG +(g: GeneratorZZ32) at :179; BIG MAX at :181,182; reads: object ZZ32Addition extends ReductionZZ32
  - `Library/CompilerLibrary.fsi:181-182` (Library/CompilerLibrary.fsi): words moved: opr BIG +() at :178; opr BIG +(g: GeneratorZZ32) at :179; ZZ32Addition at :161; reads: opr BIG MAX(): ReductionZZ32
  - `explorations/compiler-probes/p11.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `40216550c`, `Library/CompilerLibrary.fsi:180-181`, `explorations/compile-ladder/rung8/REPORT.md`
- every check passes

## Row 331, rewritten (1078 characters)
- lengths: row 1078 of 1,200, claim 235 of 300, notes 615 of 700
- reproducer `none`: exists
- citations:
  - `Library/CompilerLibrary.fsi:221-234` (Library/CompilerLibrary.fsi): holds value object Nothing end, NothingObject[\T\]; reads: value trait Maybe[\T extends Any\] extends { Condition[\T\] }
  - `ProjectFortress/tests/ExceptionScoping.fss:31` (ProjectFortress/tests/ExceptionScoping.fss): no word to check; reads: Nothing[\ZZ32\].get
  - `oddJuxt.fss:22` (ProjectFortress/tests/oddJuxt.fss): no word to check; reads: t = Nothing[\ZZ32\]
  - `explorations/compile-ladder/rung-maybe/probes/`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `Library/CompilerLibrary.fsi:223-236`
- every check passes

## Row 332, rewritten (1036 characters)
- lengths: row 1036 of 1,200, claim 206 of 300, notes 659 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fss:1628-1638` (Library/FortressLibrary.fss): holds value trait Maybe[\T\]; reads: value trait Maybe[\T\]
  - `Library/CompilerLibrary.fsi:224` (Library/CompilerLibrary.fsi): words moved: SQCAP at :225; map at :206,207,210; ivmap at :207; reads: getter isNothing(): Boolean
  - `FortressLibrary.fss:1643` (Library/FortressLibrary.fss): no word to check; reads: getter holds() = true
  - `FortressLibrary.fss:1673` (Library/FortressLibrary.fss): no word to check; reads: getter holds() = false
  - `explorations/compile-ladder/rung-maybe/probes/skeptic/SkIsNothing.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `.fss:531`, `:1506`, `:1536`, `Library/CompilerLibrary.fsi:226`, `Library/FortressLibrary.fss:1493-1501`
- every check passes

## Row 339, rewritten (1167 characters)
- lengths: row 1167 of 1,200, claim 258 of 300, notes 668 of 700
- reproducer `none`: exists
- citations:
  - `Library/CompilerLibrary.fsi:227` (Library/CompilerLibrary.fsi): holds filter; reads: abstract filter(f: T -> Condition[\()\]): Maybe[\T\]
  - `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:1212` (ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java): no word to check; reads: result = result + Naming.INTERNAL_SNOWMAN + Naming.GENERIC_SEPARATOR;
  - `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:1305-1306` (ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java): no word to check; reads: if ( NodeUtil.isVoidType(t) )
  - `runtimeSystem/InstantiatingClassloader.java:604` (ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiatingClassloader.java): words moved: NamingCzar at :40,2738,2739; reads: if (flat_params_and_ret.size() == 2 && flat_params_and_ret.get(0).equals(Naming.INTERNAL_SNOWMAN))
  - `runtimeSystem/InstantiatingClassloader.java:1009` (ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiatingClassloader.java): words moved: NamingCzar at :40,2738,2739; reads: if (parameters.size() == 2 && parameters.get(0).equals(Naming.INTERNAL_SNOWMAN))
  - `runtimeSystem/InstantiatingClassloader.java:1116` (ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiatingClassloader.java): words moved: NamingCzar at :40,2738,2739; reads: if (parameters.size() == 2 && parameters.get(0).equals(Naming.INTERNAL_SNOWMAN))
  - `runtimeSystem/InstantiatingClassloader.java:1229` (ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiatingClassloader.java): words moved: NamingCzar at :40,2738,2739; reads: if (parameters.size() == 2 && parameters.get(0).equals(Naming.INTERNAL_SNOWMAN))
- in the old line, not in the new: `:1259-1260`, `Object`, `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:1155-1170`, `h[\()\](())`, `row 470`
- every check passes

## Row 604, rewritten (1129 characters)
- lengths: row 1129 of 1,200, claim 188 of 300, notes 695 of 700
- reproducer `ProjectFortress/compiler_tests/XXXVarargsBodyIterates.test`: exists
- citations:
  - `scala_src/typechecker/impls/Misc.scala:629-640` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala): words moved: VarRef at :626,648,655; reads: // A varargs parameter is bound at the libraries' varargs parameter type.
  - `staticenv/STypeEnv.scala:191-193` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/STypeEnv.scala): no word to check; reads: case SParam(_, name, mods, _, _, Some(vaTyp)) =>
  - `Library/String.fss:446-447` (Library/String.fss): no word to check; reads: assert(range < baseString.bounds, true,
  - `Library/String.fss:486` (Library/String.fss): no word to check; reads: assert((r0≫range.left.get) ≤ range, true, "asking for substring [",  r0, "] of S", self.size, " = ", self.asFlatString)
- in the old line, not in the new: `HeapSequence`, `scala_src/typechecker/impls/Misc.scala:628-639`, `staticenv/STypeEnv.scala:184-186`
- every check passes

## Row 832, rewritten (1111 characters)
- lengths: row 1111 of 1,200, claim 236 of 300, notes 700 of 700
- reproducer `none`: exists
- citations:
  - `compiler/codegen/CodeGen.java:6529-6542` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): holds receiverPrependedDomainType; reads: private Type receiverPrependedDomainType(Type receiverType, Type domain_type) {
- in the old line, not in the new: `CodeGen.receiverPrependedDomainType`, `Object`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6250-6263`
- every check passes

## Row 833, rewritten (1200 characters)
- lengths: row 1200 of 1,200, claim 285 of 300, notes 685 of 700
- reproducer `ProjectFortress/tests/XXXCoercionStaticRungC.fss`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/Shell.java:422-424` (ProjectFortress/src/com/sun/fortress/Shell.java): words moved: fortress.compile.typecheck at :1277; reads: } else if (what.equals("walk")) {
  - `ProjectFortress/src/com/sun/fortress/Shell.java:1277` (ProjectFortress/src/com/sun/fortress/Shell.java): words moved: setScala(false) at :424,469,477; reads: boolean type_check = ProjectProperties.getBoolean("fortress.compile.typecheck", false); // run type checker or not
  - `ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:229` (ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java): no word to check; reads: throw new Error("The Java version of the type checker is gone now.");
- in the old line, not in the new: `:1275`, `ProjectFortress/src/com/sun/fortress/Shell.java:420-424`, `compiler/StaticChecker.java`, `compiler/StaticChecker.java:228-229`, `grep -rl CoercionInvocation ProjectFortress/src/com/sun/fortress/interpreter`
- every check passes

## Row 514, rewritten (953 characters)
- lengths: row 953 of 1,200, claim 196 of 300, notes 552 of 700
- reproducer `ProjectFortress/compiler_tests/XXXStridedRangeRungT.fss`: exists
- citations:
  - `Library/CompilerLibrary.fsi:171-172` (Library/CompilerLibrary.fsi): words moved: nat at :22,156,279; reads: opr :(lo:ZZ32, hi:ZZ32): Range
- in the old line, not in the new: `Library/CompilerLibrary.fsi:173-174`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 69: row 69: rewritten (758 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 74: row 74: rewritten (1005 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 331: row 331: rewritten (1078 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 332: row 332: rewritten (1036 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 339: row 339: rewritten (1167 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 604: row 604: rewritten (1129 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 832: row 832: rewritten (1111 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 833: row 833: rewritten (1200 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 514: row 514: rewritten (953 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 9 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 9 lines, 0 failing, every check passes.
