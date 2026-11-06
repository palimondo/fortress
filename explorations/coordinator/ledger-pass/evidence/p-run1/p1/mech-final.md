# Mechanical check of p1, the judge's files, base de6d905f5

## Row 349, rewritten (1158 characters)
- lengths: row 1158 of 1,200, claim 247 of 300, notes 697 of 700
- reproducer `ProjectFortress/compiler_tests/XXXZZNarrowRungP.test`: exists
- citations:
  - `Library/FortressLibrary.fsi:646` (Library/FortressLibrary.fsi): words moved: trait ZZ at :536,593,651; trait ZZ64 at :593; reads: widen(self):ZZ64
  - `Library/FortressLibrary.fsi:698-699` (Library/FortressLibrary.fsi): words moved: trait ZZ at :536,593,651; trait ZZ64 at :593; reads: narrow(self): ZZ32
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:103-145` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi): words moved: widen at :269,328; trait ZZ64 at :147; narrow at :206,386; reads: trait ZZ extends { Number, Equality[\ZZ\] } excludes { RR64, ZZ64, ZZ32, NN32, NN64, IntLiteral }
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:147-208` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi): words moved: widen at :269,328; reads: trait ZZ64 extends { Number, Equality[\ZZ64\] } excludes { RR64 , ZZ }
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:580` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): words moved: narrow at :659,879; reads: coerce(x: ZZ32) = jIntToLong(x)
  - `explorations/compile-ladder/rung-int-conversions/probes/skeptic/SK3Tower.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `:670-671`, `Library/FortressLibrary.fsi:634`, `narrow(z)`, `z: ZZ32`
- every check passes

## Row 381, rewritten (1095 characters)
- lengths: row 1095 of 1,200, claim 233 of 300, notes 677 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:647-648` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): holds LSHIFT, RSHIFT; reads: opr LSHIFT(self, other:ZZ64): ZZ64 = jLongBitLeftShift(self,other)
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:736-737` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): holds LSHIFT, RSHIFT; reads: opr LSHIFT(self, other:ZZ32): ZZ32 = jIntBitLeftShift(self,other)
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:580` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): words moved: LSHIFT at :647,736; RSHIFT at :648,737; reads: coerce(x: ZZ32) = jIntToLong(x)
  - `Library/FortressLibrary.fss:796` (Library/FortressLibrary.fss): no word to check; reads: opr LSHIFT(self,b:AnyIntegral):ZZ32 =
  - `explorations/compile-ladder/rung-shift-count/probes/`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `SkCountType.fss`, `SkShiftCountZZK.fss`, `explorations/compile-ladder/rung-int-semantics-walk/`, `row 380`, `rung-shift-count/`, `shift`
- every check passes

## Row 383, rewritten (1168 characters)
- lengths: row 1168 of 1,200, claim 230 of 300, notes 646 of 700
- reproducer `ProjectFortress/compiler_tests/XXXShiftDeclRungI.test`: exists
- citations:
  - `Library/FortressLibrary.fsi:700` (Library/FortressLibrary.fsi): words moved: trait ZZ at :536,593,651; reads: shift(self, k:AnyIntegral): ZZ
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:551` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): no word to check; reads: opr <<<(self, other:ZZ32): ZZ = BItoZZ(jAPShiftLeft(ZZtoBI(self),other))
  - `explorations/compile-ladder/rung-int-semantics-walk/probes/skeptic/`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `LSHIFT`, `Library/FortressLibrary.fsi:672`, `RSHIFT`, `SkShiftCall.fss`, `SkShiftLocal.fss`, `SkShiftParam.fss`
- every check passes

## Row 441, rewritten (1188 characters)
- lengths: row 1188 of 1,200, claim 261 of 300, notes 699 of 700
- reproducer `ProjectFortress/compiler_tests/XXXIntegerPowerContractCompiled.test`: exists
- citations:
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:744` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): words moved: simpleIntArith.intExp at :75; reads: opr ^(self, other:ZZ32):ZZ32 = jIntExp(self, other)
  - `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:415-421` (ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java): holds Math.pow; reads: public static int intExp(int a, int b) {
  - `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:395-413` (ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java): holds intToIntPower; reads: public static int intToIntPower(int a, int b) {
- in the old line, not in the new: `:380-398`, `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:400-406`, `perf-probes/integer-power/REPORT.md`
- every check passes

## Row 502, rewritten (942 characters)
- lengths: row 942 of 1,200, claim 155 of 300, notes 675 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fsi:699` (Library/FortressLibrary.fsi): holds widen; reads: widen(self): ZZ64
  - `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/BigNum.java:292-296` (ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/BigNum.java): holds x.longValue(); reads: public static final class ToZZ64 extends Z2L {
  - `explorations/compile-ladder/rung-spec-integer-rules/probes/skeptic/SkZZWiden.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `Specification/basic/operators/opr-overview.tex`, `big`, `explorations/coordinator/PLAN.md`
- every check passes

## Row 523, rewritten (1199 characters)
- lengths: row 1199 of 1,200, claim 205 of 300, notes 660 of 700
- reproducer `ProjectFortress/compiler_tests/XXXPowZZ32CompiledRungE.test`: exists
- citations:
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:744` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): words moved: simpleIntArith.intExp at :75; reads: opr ^(self, other:ZZ32):ZZ32 = jIntExp(self, other)
  - `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:415-421` (ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java): holds RuntimeException, double; reads: public static int intExp(int a, int b) {
  - `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:395-413` (ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java): holds intToIntPower; reads: public static int intToIntPower(int a, int b) {
- in the old line, not in the new: `:380-398`, `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:400-406`
- every check passes

## Row 524, rewritten (1163 characters)
- lengths: row 1163 of 1,200, claim 190 of 300, notes 639 of 700
- reproducer `ProjectFortress/compiler_tests/XXXPowNN32CompiledRungE.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedIntArith.java:229-235` (ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedIntArith.java): holds double; reads: public static int unsignedIntExp(int a, int b) {
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:809` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): words moved: simpleUnsignedIntArith.unsignedIntExp at :118; reads: opr ^(self, other:NN32):NN32 = jMakeNN32FromZZ32(jUnsignedIntExp(jMakeZZ32FromNN32(self), jMakeZZ32FromNN32(other)))
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:118` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): holds simpleUnsignedIntArith.unsignedIntExp; reads: simpleUnsignedIntArith.unsignedIntExp => jUnsignedIntExp,
  - `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:463` (ProjectFortress/LibraryBuiltin/FortressBuiltin.fss): holds NN32$Pow; reads: builtinPrimitive("com.sun.fortress.interpreter.glue.prim.NN32$Pow")
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedIntArith.java:218-224`, `row 326`
- every check passes

## Row 525, rewritten (1032 characters)
- lengths: row 1032 of 1,200, claim 103 of 300, notes 595 of 700
- reproducer `ProjectFortress/compiler_tests/XXXPowNN64CompiledRungE.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedLongArith.java:240-243` (ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedLongArith.java): holds return a + b;; reads: // NIY
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:878` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): words moved: simpleUnsignedLongArith.unsignedLongExp at :156; reads: opr ^(self, other:NN64):NN64 = jMakeNN64FromZZ64(junsignedLongExp(jMakeZZ64FromNN64(self), jMakeZZ64FromNN64(other)))
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:156` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): holds simpleUnsignedLongArith.unsignedLongExp; reads: simpleUnsignedLongArith.unsignedLongExp => junsignedLongExp}
  - `Library/FortressLibrary.fss:979` (Library/FortressLibrary.fss): holds UnsignedLong$Pow; reads: builtinPrimitive("com.sun.fortress.interpreter.glue.prim.UnsignedLong$Pow")
  - `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/UnsignedLong.java:327` (ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/UnsignedLong.java): no word to check; reads: public static long powExact(long x, long y) {
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedLongArith.java:222-225`
- every check passes

## Row 581, rewritten (926 characters)
- lengths: row 926 of 1,200, claim 135 of 300, notes 670 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fsi:542-543` (Library/FortressLibrary.fsi): no word to check; reads: getter minimum(): ZZ32
  - `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:179` (ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi): no word to check; reads: object IntLiteral extends { Number }
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:390-431` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi): no word to check; reads: trait IntLiteral extends { Number, Equality[\IntLiteral\] } excludes {ZZ32, ZZ64, NN32, RR64, RR32, Character, Boolean, String, NN64, ZZ}
  - `explorations/compile-ladder/rung-numeral-library/SKEPTIC.md:100` (explorations/compile-ladder/rung-numeral-library/SKEPTIC.md): holds SkqR2f; reads: - `SkqR2f`. `(3).minimum` and `(3).maximum` are "IntLiteral has no getter called minimum" (and `maximum`) on `edit3` only. Accepted on both:
- in the old line, not in the new: `Library/FortressLibrary.fsi:534-535`, `SkqR2f.fss`, `check.sh`, `check.sh SkqR2f base`
- every check passes

## Row 856, rewritten (1048 characters)
- lengths: row 1048 of 1,200, claim 227 of 300, notes 672 of 700
- reproducer `ProjectFortress/tests/SignedAboveSignedRangeWalk.fss`: exists
- citations:
  - `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:469` (ProjectFortress/LibraryBuiltin/FortressBuiltin.fss): words moved: long at :380,382,384; reads: signed(self):ZZ32 =
  - `Library/FortressLibrary.fss:985` (Library/FortressLibrary.fss): no word to check; reads: signed(self):ZZ64 =
  - `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedIntArith.java:242` (ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedIntArith.java): no word to check; reads: public static int makeZZ32FromNN32WithSpecialCompilerHackForNN32ArgumentType(int x) {return x;}
  - `simpleUnsignedLongArith.java:246` (ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedLongArith.java): no word to check; reads: public static long makeZZ64FromNN64WithSpecialCompilerHackForNN64ArgumentType(long x) {return x;}
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:816` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): no word to check; reads: signed(self): ZZ32 = jMakeZZ32FromNN32(self)
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:880` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): no word to check; reads: signed(self): ZZ64 = jMakeZZ64FromNN64(self)
- in the old line, not in the new: `LibraryBuiltin/CompilerBuiltin.fss`, `LibraryBuiltin/CompilerBuiltin.fss:816`, `LibraryBuiltin/FortressBuiltin.fss`, `LibraryBuiltin/FortressBuiltin.fss:469`, `NN32$ToInt`, `UnsignedLong$ToLong`, `basic-lib/basic-integers.tex`, `narrow`, `nativeHelpers/simpleUnsignedIntArith.java`, `nativeHelpers/simpleUnsignedIntArith.java:242`, `widen`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 349: row 349: rewritten (1158 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 381: row 381: rewritten (1095 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 383: row 383: rewritten (1168 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 441: row 441: rewritten (1188 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 502: row 502: rewritten (942 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 523: row 523: rewritten (1199 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 524: row 524: rewritten (1163 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 525: row 525: rewritten (1032 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 581: row 581: rewritten (926 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 856: row 856: rewritten (1048 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 10 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base de6d905f5 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 10 lines, 0 failing, every check passes.
