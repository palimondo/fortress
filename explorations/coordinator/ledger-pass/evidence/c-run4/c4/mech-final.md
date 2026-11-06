# Mechanical check of c4, the judge's files, base c124c6b65

## Row 360, rewritten (1174 characters)
- lengths: row 1174 of 1,200, claim 225 of 300, notes 678 of 700
- reproducer `ProjectFortress/tests/XXXRoundNearTieNumeral.fss`: exists
- citations:
  - `LibraryBuiltin/FortressBuiltin.fss:196` (ProjectFortress/LibraryBuiltin/FortressBuiltin.fss): holds object FloatLiteral extends RR64; reads: object FloatLiteral extends RR64
  - `interpreter/evaluator/values/FFloatLiteral.java:39-40` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FFloatLiteral.java): holds Double.valueOf; reads: public double getFloat() {
  - `LibraryBuiltin/CompilerBuiltin.fss:932` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): holds coerce(x: FloatLiteral); reads: coerce(x: FloatLiteral) = x.asRR64
- in the old line, not in the new: `3.0`, `FFloatLiteral.java`, `FFloatLiteral.java:39-40`, `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss`, `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:932`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:194`, `floor(2.99999999999999999)`, `row 325`
- every check passes

## Row 361, rewritten (1089 characters)
- lengths: row 1089 of 1,200, claim 217 of 300, notes 599 of 700
- reproducer `ProjectFortress/tests/XXXRadixTenPointNumeral.fss`: exists
- citations:
  - `interpreter/evaluator/values/FFloatLiteral.java:28` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FFloatLiteral.java): words moved: getFloat at :39,48,51; Double.valueOf at :40; reads: if (denomBase == 10) value = s;
  - `interpreter/evaluator/values/FFloatLiteral.java:40` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FFloatLiteral.java): words moved: denomBase == 10 at :28; getFloat at :39,48,51; reads: return Double.valueOf(value);
  - `interpreter/evaluator/Evaluator.java:1632` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java): no word to check; reads: return new FFloatLiteral(x.getText(), x.getIntPart(), x.getNumerator(), x.getDenomBase(), x.getDenomPower());
  - `explorations/compile-ladder/rung-round-half-even/probes/skeptic/Sk2RadixTen.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `Evaluator.java`, `Evaluator.java:1503`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FFloatLiteral.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FFloatLiteral.java:28`
- every check passes

## Row 362, rewritten (1194 characters)
- lengths: row 1194 of 1,200, claim 216 of 300, notes 688 of 700
- reproducer `ProjectFortress/compiler_tests/XXXNumeralPrintRungR.test`: exists
- citations:
  - `compiler/runtimeValues/FFloatLiteral.java:52-54` (ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FFloatLiteral.java): holds asString; reads: public FJavaString asString() {
  - `compiler/runtimeValues/FIntLiteral.java:57-61` (ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FIntLiteral.java): holds FJavaString.make(this.toString()), asString; reads: public FJavaString asString() {
- in the old line, not in the new: `FIntLiteral.java`, `FIntLiteral.java:57-61`, `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FFloatLiteral.java`, `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FFloatLiteral.java:52-54`, `return FJavaString.make(this.toString());`, `return null`
- every check passes

## Row 443, rewritten (1188 characters)
- lengths: row 1188 of 1,200, claim 241 of 300, notes 678 of 700
- reproducer `ProjectFortress/tests/XXXNumeralFloatRungP.fss`: exists
- citations:
  - `interpreter/evaluator/values/FIntLiteral.java:40-56` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FIntLiteral.java): words moved: ZZ32 at :63; reads: public static FValue make(BigInteger v) {
  - `Library/FortressLibrary.fsi:302-304` (Library/FortressLibrary.fsi): words moved: Long at :491,595; reads: coerce(x: ZZ32)
  - `explorations/compile-ladder/rung-spec-numbers/probes/skeptic/SkNumeralFloat.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `Library/FortressLibrary.fsi:297-299`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FIntLiteral.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FIntLiteral.java:40-56`
- every check passes

## Row 454, rewritten (1179 characters)
- lengths: row 1179 of 1,200, claim 239 of 300, notes 698 of 700
- reproducer `none`: exists
- citations:
  - `interpreter/evaluator/values/FIntLiteral.java:40-56` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FIntLiteral.java): words moved: FloatLiteral at :81; reads: public static FValue make(BigInteger v) {
  - `LibraryBuiltin/FortressBuiltin.fsi:44` (ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi): words moved: NN64 at :171,176,185; coerce at :132; reads: object FloatLiteral extends RR64
  - `LibraryBuiltin/CompilerBuiltin.fss:993` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): no word to check; reads: coerce(x: FloatLiteral) = x.asRR32
  - `explorations/reviews/numerics-plan-coordinator/probes-B/`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:44`, `compiler_tests/NativeHelperFamilyRR32Compiled.fss`, `narrow`
- every check passes

## Row 529, rewritten (1009 characters)
- lengths: row 1009 of 1,200, claim 205 of 300, notes 697 of 700
- reproducer `none`: exists
- citations:
  - `LibraryBuiltin/CompilerBuiltin.fss:992-994` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): words moved: coerce(x: RR32) at :933; reads: trait RR32 extends { Number, Equality[\RR32\] } excludes { ZZ64, ZZ32, RR64 }
  - `LibraryBuiltin/CompilerBuiltin.fss:933` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): holds coerce(x: RR32); reads: coerce(x: RR32) = jFloatToDouble(x)
  - `CompilerBuiltin.fsi:479` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi): holds FloatLiteral; reads: trait FloatLiteral excludes {RR32, RR64}
  - `explorations/compile-ladder/rung-rr32-sibling/probes/comp/RR32Comp.comp.txt`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `probes/skeptic/SkDiffC.comp.txt`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss`, `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:992-994`
- every check passes

## Row 862, rewritten (1145 characters)
- lengths: row 1145 of 1,200, claim 229 of 300, notes 700 of 700
- reproducer `ProjectFortress/compiler_tests/XXXFloatNumeralOneRounding.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1997-2007` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): no word to check; reads: public void forFloatLiteralExpr(FloatLiteralExpr x) {
  - `compiler/runtimeValues/FFloatLiteral.java:44-46` (ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FFloatLiteral.java): words moved: Double.valueOf at :28; reads: public static FFloatLiteral make(String s) {
  - `interpreter/evaluator/values/FFloatLiteral.java:26-41` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FFloatLiteral.java): holds Double.valueOf; reads: public FFloatLiteral(String s, BigInteger intPart, BigInteger numerator, int denomBase, int denomPower) {
  - `interpreter/evaluator/values/FFloatLiteral.java:30-31` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FFloatLiteral.java): words moved: Double.valueOf at :40; reads: double val = intPart.doubleValue() + (numerator.doubleValue() / Math.pow(denomBase, denomPower));
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1994-2004`, `basic/expressions/literals.tex`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 360: row 360: rewritten (1174 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 361: row 361: rewritten (1089 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 362: row 362: rewritten (1194 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 443: row 443: rewritten (1188 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 454: row 454: rewritten (1179 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 529: row 529: rewritten (1009 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 862: row 862: rewritten (1145 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 7 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 7 lines, 0 failing, every check passes.
