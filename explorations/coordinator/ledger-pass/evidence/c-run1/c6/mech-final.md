# Mechanical check of c6, the judge's files, base c124c6b65

## Row 140, rewritten (962 characters)
- lengths: row 962 of 1,200, claim 236 of 300, notes 645 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fss:4606-4611` (Library/FortressLibrary.fss): holds strToFloat, SUM[\ZZ32\], 10^k; reads: strToFloat(s: String): RR64 = do   (*) Quick and dirty implementation
  - `explorations/run-c/src/FlatData.fss:13` (explorations/run-c/src/FlatData.fss): holds parseFloat; reads: parseFloat(s: String): RR64 = do
  - `explorations/run-c/probes/g140_strtofloat.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `10^k (both[\|both\|-1-k].codePoint - '0'.codePoint)`, `Library/FortressLibrary.fss:4421-4426`
- every check passes

## Row 338, rewritten (1006 characters)
- lengths: row 1006 of 1,200, claim 195 of 300, notes 654 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fss:736` (Library/FortressLibrary.fss): holds minimum; reads: getter minimum(): ZZ32 = -2147483647 - 1
  - `Library/FortressLibrary.fss:826` (Library/FortressLibrary.fss): holds minimum; reads: getter minimum(): ZZ64 = -9223372036854775807 - 1
  - `explorations/compile-ladder/repair-r2-literal-wrap/probes/skeptic/s1.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `:819`, `Library/FortressLibrary.fss:730`, `explorations/compile-ladder/repair-r2-literal-wrap/probes/skeptic/s7.fss`, `s1.fss`, `s7.compiled`, `s7.walk`
- every check passes

## Row 579, rewritten (1062 characters)
- lengths: row 1062 of 1,200, claim 183 of 300, notes 698 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fss:725-727` (Library/FortressLibrary.fss): holds round(self); reads: opr |\self/|: I = self
  - `Library/FortressLibrary.fsi:449` (Library/FortressLibrary.fsi): words moved: round at :439,864,2715; round(self) at :439; reads: trait Integral[\I extends Integral[\I\]\] extends { StandardTotalOrder[\I\], MultiplicativeRing[\I\], AnyIntegral }
  - `explorations/reviews/numerics-plan-coordinator/probes-B/check.sh`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `Library/FortressLibrary.fsi:443`, `Library/FortressLibrary.fss:719-721`, `check.sh`, `check.sh FloorBracketCk base`
- every check passes

## Row 321, rewritten (1077 characters)
- lengths: row 1077 of 1,200, claim 192 of 300, notes 652 of 700
- reproducer `ProjectFortress/compiler_tests/XXXFortToStringRungS.test`: exists
- citations:
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:355` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): words moved: defaultAsString at :287; reads: getter asString(): String = jDefaultAsString(self)
  - `ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java:108-118` (ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java): words moved: asString at :76,107; reads: public static String defaultAsString(fortress.AnyType.Any a) {
  - `ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java:109` (ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java): words moved: asString at :76,107; defaultAsString at :108; reads: return hasOwnToString(a) ? a.toString() : typeName(a);
  - `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FValue.java:25-27` (ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FValue.java): holds asString, this.asString().toString(); reads: public String toString() {
- in the old line, not in the new: `6bec1b004`, `:76`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:51`, `ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java:79-86`, `getter toString`, `trait Object`
- every check passes

## Row 369, rewritten (1069 characters)
- lengths: row 1069 of 1,200, claim 197 of 300, notes 664 of 700
- reproducer `ProjectFortress/tests/XXXTupleSeparatorRungS.fss`: exists
- citations:
  - `Library/FortressLibrary.fss:4425-4433` (Library/FortressLibrary.fss): words moved: trait String at :4341; reads: opr ||(self, b:(Any,Any)):String = do (i,j) = b; self || "(" || i || "," j || ")" end
  - `Library/FortressLibrary.fss:4549` (Library/FortressLibrary.fss): holds println(a:Any), println("" a); reads: println(a:Any):() = println("" a)     (* with concat also works for tuples *)
  - `FTupleLike.java:60` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FTupleLike.java): no word to check; reads: res.append(',');
  - `Library/FortressLibrary.fss:4488` (Library/FortressLibrary.fss): holds cast[\Object\](b).asString; reads: opr ||(a:String, b:Any):String = a || cast[\Object\](b).asString
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:471` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): no word to check; reads: println(a: Any, b: Any): () = jPrintln(("(" str(a) ", " str(b) ")").asJavaString)
- in the old line, not in the new: `:4412`, `:4513`, `Library/FortressLibrary.fss:4402-4410`, `opr \|\|(self, b:Any)`, `tuple`
- every check passes

## Row 75, rewritten (1090 characters)
- lengths: row 1090 of 1,200, claim 170 of 300, notes 687 of 700
- reproducer `explorations/tparallel.fss`: exists
- citations:
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:23` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi): holds nanoTime(): RR64; reads: nanoTime(): RR64
  - `CompilerBuiltin.fss:352` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): holds nanoTime(): RR64; reads: nanoTime(): RR64 = jNanoTime()
  - `Library/FortressLibrary.fsi:2563` (Library/FortressLibrary.fsi): no word to check; reads: nanoTime():ZZ64
  - `Library/FortressLibrary.fss:4522` (Library/FortressLibrary.fss): holds nanoTime():ZZ64, simpleLongArith.longNanoTime; reads: nanoTime():ZZ64 = builtinPrimitive("com.sun.fortress.nativeHelpers.simpleLongArith.longNanoTime")
- in the old line, not in the new: `63e420a33`, `Library/FortressLibrary.fsi:2547`
- every check passes

## Row 313, rewritten (1122 characters)
- lengths: row 1122 of 1,200, claim 273 of 300, notes 662 of 700
- reproducer `none`: exists
- citations: none with lines
- in the old line, not in the new: nothing
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 140: row 140: rewritten (962 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 338: row 338: rewritten (1006 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 579: row 579: rewritten (1062 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 321: row 321: rewritten (1077 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 369: row 369: rewritten (1069 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 75: row 75: rewritten (1090 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 313: row 313: rewritten (1122 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 7 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 7 lines, 0 failing, every check passes.
