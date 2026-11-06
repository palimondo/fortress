# Mechanical check of c17, the judge's files, base c124c6b65

## Row 305, rewritten (1108 characters)
- lengths: row 1108 of 1,200, claim 194 of 300, notes 666 of 700
- reproducer `explorations/run-c4/src/FlatArrays.fss`: exists
- citations:
  - `CompilerBuiltin.fsi:563` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi): no word to check; reads: trait ZZ32Vector excludes { String, Number, Boolean, Character }
  - `CompilerBuiltin.fsi:582` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi): no word to check; reads: trait StringVector
- in the old line, not in the new: `FlatArrays.fss`
- every check passes

## Row 733, rewritten (1075 characters)
- lengths: row 1075 of 1,200, claim 240 of 300, notes 692 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1009` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): words moved: dumpMethodChaining at :915,4680,5411; reads: if (typeAnalyzer.equiv(alreadyType,tupTrait)) {
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1006`
- every check passes

## Row 837, rewritten (1105 characters)
- lengths: row 1105 of 1,200, claim 288 of 300, notes 618 of 700
- reproducer `ProjectFortress/compiler_tests/XXXObjectFieldWithoutType.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Thunker.scala:91` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Thunker.scala): words moved: SVarDecl at :42,58,90; reads: if (! lhs.forall( lvalue => lvalue.getIdType().isSome())) throw TypeError.make("Must provide type for initializer " + lhs,d.getInfo().getSpa
  - `Library/CovariantCollection.fss:135` (Library/CovariantCollection.fss): no word to check; reads: sz: ZZ32 = |a| + |b|
- in the old line, not in the new: `:6:5-14`, `Library/CovariantCollection.fss:125`
- every check passes

## Row 840, rewritten (1136 characters)
- lengths: row 1136 of 1,200, claim 244 of 300, notes 677 of 700
- reproducer `ProjectFortress/compiler_tests/XXXTupleNamedComponentGenericParam.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/runtimeSystem/Naming.java:1196` (ProjectFortress/src/com/sun/fortress/runtimeSystem/Naming.java): no word to check; reads: public static final String TUPLE_OX = TUPLE_TAG + "\u27e6";
- in the old line, not in the new: nothing
- every check passes

## Row 845, rewritten (1106 characters)
- lengths: row 1106 of 1,200, claim 300 of 300, notes 695 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BaseEnv.java:535-537` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BaseEnv.java): words moved: import java at :36,37,38; InterpreterBug at :16; reads: if (opt_api.isSome()) {
  - `ProjectFortress/src/com/sun/fortress/interpreter/env/ClosureMaker.java:99` (ProjectFortress/src/com/sun/fortress/interpreter/env/ClosureMaker.java): no word to check; reads: System.err.println(md);
  - `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:369-372` (ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java): no word to check; reads: if (WellKnownNames.fortressBuiltin().equals("FortressBuiltin")) {
- in the old line, not in the new: `3cd653815`, `P.fss`, `bin/fortress P.fss`
- every check passes

## Row 890, rewritten (1041 characters)
- lengths: row 1041 of 1,200, claim 261 of 300, notes 574 of 700
- reproducer `ProjectFortress/compiler_tests/XXXFinallyOnEscape.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2078-2089` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): holds ATHROW, throwForbiddenException; reads: throwForbiddenException(x);
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2075-2085`
- every check passes

## Row 891, rewritten (1126 characters)
- lengths: row 1126 of 1,200, claim 240 of 300, notes 678 of 700
- reproducer `ProjectFortress/compiler_tests/XXXTryFinallyNoCatch.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2081-2089` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): no word to check; reads: if (catchClauses.isSome() || !forbid.isEmpty()) {
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2077-2085`
- every check passes

## Row 719, rewritten (919 characters)
- lengths: row 919 of 1,200, claim 172 of 300, notes 590 of 700
- reproducer `none`: exists
- citations:
  - `Library/RangeInternals.fss:1357-1367` (Library/RangeInternals.fss): no word to check; reads: generate[\T\](red:Reduction[\T\], body: ZZ32->T): T = do
  - `Library/CovariantCollection.fss:146-149` (Library/CovariantCollection.fss): words moved: cata at :101,109,124; reads: object CVReduction[\T\] extends MonoidReduction[\AnyCovColl\]
  - `Library/CovariantCollection.fss:138-143` (Library/CovariantCollection.fss): words moved: CVReduction at :146,156; APPCOV at :30,42,43; reads: cata[\R\](e:R, s:T->R, app:(ZZ32,R,R)->R): R = app(sz,a.cata[\R\](e,s,app),b.cata[\R\](e,s,app))
- in the old line, not in the new: `JAVA_FLAGS='-Xmx768m -Xss32m' bin/fortress P.fss`, `Library/CovariantCollection.fss:138-143`, `P.fss`
- every check passes

## Row 294, rewritten (990 characters)
- lengths: row 990 of 1,200, claim 212 of 300, notes 684 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fss:2874-2875` (Library/FortressLibrary.fss): words moved: lmul at :2938,2967,2968; TransposedMatrix at :2943,2955,2963; reads: mul[\ nat s2 \](other: Matrix[\T,s1,s2\]): Matrix[\T,s0,s2\] = do
  - `Library/FortressLibrary.fss:2933-2942` (Library/FortressLibrary.fss): words moved: res = matrix[\T,s0,s2\]() at :2875; TransposedMatrix at :2943,2955,2963; reads: rmul(v: Vector[\T,s1\]): Vector[\T,s0\] = do
  - `Library/FortressLibrary.fss:2943` (Library/FortressLibrary.fss): words moved: lmul at :2938,2967,2968; res = matrix[\T,s0,s2\]() at :2875; reads: t(): Matrix[\T,s1,s0\] = TransposedMatrix[\T,s1,s0\](self)
  - `Library/FortressLibrary.fss:2955-2971` (Library/FortressLibrary.fss): words moved: res = matrix[\T,s0,s2\]() at :2875; reads: object TransposedMatrix[\T extends { Number, MultiplicativeRing[\T\] }, nat s0, nat s1\](mem:Matrix[\T,s1,s0\])
  - `explorations/run-c4/probes/vocabulary/v03_carrier_shed.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `:2752-2761`, `:2762`, `:2774-2792`, `Library/FortressLibrary.fss:2709-2751`
- every check passes

## Row 798, rewritten (893 characters)
- lengths: row 893 of 1,200, claim 209 of 300, notes 582 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fsi:1621-1623` (Library/FortressLibrary.fsi): words moved: Indexed1 at :1259,1576,1716; Indexed2 at :1261,1716,1825; Rank2 at :1245,1248,1716; reads: trait Array1[\T, nat b0, nat s0\]
  - `Library/FortressLibrary.fsi:1575` (Library/FortressLibrary.fsi): words moved: Indexed1 at :1259,1576,1716; Indexed2 at :1261,1716,1825; Rank2 at :1245,1248,1716; reads: trait ReadableArray1[\T, nat b0, nat s0\]
  - `Library/FortressLibrary.fsi:1715-1717` (Library/FortressLibrary.fsi): words moved: ReadableArray1 at :1569,1575,1583; reads: trait Array2[\T, nat b0, nat s0, nat b1, nat s1\]
  - `explorations/run-c4/src/FlatArrays.fss:36` (explorations/run-c4/src/FlatArrays.fss): holds Diag; reads: object Diag[\nat s\](d: Vector[\RR64,s\]) extends Matrix[\RR64,s,s\]
- in the old line, not in the new: `:1695-1697`, `Library/FortressLibrary.fsi:1591-1593`
- every check passes

## Row 808, rewritten (1032 characters)
- lengths: row 1032 of 1,200, claim 281 of 300, notes 575 of 700
- reproducer `ProjectFortress/tests/XXXArray2ShiftedSlice.fss`: exists
- citations:
  - `Library/FortressLibrary.fss:2828` (Library/FortressLibrary.fss): holds index(on0 - bo0, on1 - bo1); reads: (o0', o1') = index(on0 - bo0, on1 - bo1)
  - `Library/FortressLibrary.fss:2515` (Library/FortressLibrary.fss): words moved: index(on0 - bo0, on1 - bo1) at :2828; reads: o_n : ZZ32 = o - b0
  - `Library/FortressLibrary.fss:2727-2734` (Library/FortressLibrary.fss): no word to check; reads: shift(t1:(ZZ32,ZZ32)): Array[\T,(ZZ32,ZZ32)\] = do
  - `Library/FortressLibrary.fss:2448-2453` (Library/FortressLibrary.fss): words moved: Col at :1883,2719,2721; Row at :2718,2723,2725; reads: shift(o:ZZ32): Array[\T,ZZ32\] =
- in the old line, not in the new: `:2445-2450`, `:2512`, `:2724-2731`, `Library/FortressLibrary.fss:2825`, `row 793`, `row 794`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 305: row 305: rewritten (1108 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 733: row 733: rewritten (1075 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 837: row 837: rewritten (1105 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 840: row 840: rewritten (1136 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 845: row 845: rewritten (1106 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 890: row 890: rewritten (1041 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 891: row 891: rewritten (1126 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 719: row 719: rewritten (919 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 294: row 294: rewritten (990 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 798: row 798: rewritten (893 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 808: row 808: rewritten (1032 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 11 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 11 lines, 0 failing, every check passes.
