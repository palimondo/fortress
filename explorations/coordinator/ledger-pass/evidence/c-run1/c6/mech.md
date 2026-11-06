# Mechanical check of c6, the writer's files, base c124c6b65

## Row 140, rewritten (908 characters)
- lengths: row 908 of 1,200, claim 182 of 300, notes 645 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fss:4606-4611` (Library/FortressLibrary.fss): holds strToFloat, SUM[\ZZ32\], 10^k; reads: strToFloat(s: String): RR64 = do   (*) Quick and dirty implementation
  - `explorations/run-c/src/FlatData.fss:13` (explorations/run-c/src/FlatData.fss): holds parseFloat; reads: parseFloat(s: String): RR64 = do
  - `explorations/run-c/probes/g140_strtofloat.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `10^k (both[\|both\|-1-k].codePoint - '0'.codePoint)`, `Library/FortressLibrary.fss:4421-4426`
- every check passes

## Row 338, rewritten (1051 characters)
- lengths: row 1051 of 1,200, claim 195 of 300, notes 699 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fss:736` (Library/FortressLibrary.fss): holds minimum; reads: getter minimum(): ZZ32 = -2147483647 - 1
  - `Library/FortressLibrary.fss:826` (Library/FortressLibrary.fss): holds minimum; reads: getter minimum(): ZZ64 = -9223372036854775807 - 1
  - `explorations/compile-ladder/repair-r2-literal-wrap/probes/skeptic/s1.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/compile-ladder/repair-r2-literal-wrap/probes/skeptic/s7.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `:819`, `Library/FortressLibrary.fss:730`, `s1.fss`, `s7.compiled`, `s7.walk`
- every check passes

## Row 579, rewritten (1060 characters)
- lengths: row 1060 of 1,200, claim 183 of 300, notes 696 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fss:725-727` (Library/FortressLibrary.fss): holds round(self); reads: opr |\self/|: I = self
  - `Library/FortressLibrary.fsi:449` (Library/FortressLibrary.fsi): words moved: round at :439,864,2715; round(self) at :439; reads: trait Integral[\I extends Integral[\I\]\] extends { StandardTotalOrder[\I\], MultiplicativeRing[\I\], AnyIntegral }
  - `explorations/reviews/numerics-plan-coordinator/probes-B/check.sh`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `Library/FortressLibrary.fsi:443`, `Library/FortressLibrary.fss:719-721`, `check.sh`, `check.sh FloorBracketCk base`, `explorations/compile-ladder/rung-numeral-library/REPORT.md`
- every check passes

## Row 321, rewritten (1124 characters)
- lengths: row 1124 of 1,200, claim 192 of 300, notes 699 of 700
- reproducer `ProjectFortress/compiler_tests/XXXFortToStringRungS.test`: exists
- citations:
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:355` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): words moved: defaultAsString at :287; reads: getter asString(): String = jDefaultAsString(self)
  - `ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java:108-118` (ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java): words moved: asString at :76,107; reads: public static String defaultAsString(fortress.AnyType.Any a) {
  - `ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java:109` (ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java): words moved: asString at :76,107; defaultAsString at :108; reads: return hasOwnToString(a) ? a.toString() : typeName(a);
  - `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:51` (ProjectFortress/LibraryBuiltin/FortressBuiltin.fss): words moved: trait Object at :37; reads: getter toString(): String = self.asString             (* deprecated *)
- in the old line, not in the new: `6bec1b004`, `:76`, `ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java:79-86`
- every check passes

## Row 369, rewritten (1078 characters)
- lengths: row 1078 of 1,200, claim 197 of 300, notes 673 of 700
- reproducer `ProjectFortress/tests/XXXTupleSeparatorRungS.fss`: exists
- citations:
  - `Library/FortressLibrary.fss:4425-4433` (Library/FortressLibrary.fss): words moved: trait String at :4341; reads: opr ||(self, b:(Any,Any)):String = do (i,j) = b; self || "(" || i || "," j || ")" end
  - `Library/FortressLibrary.fss:4549` (Library/FortressLibrary.fss): holds println(a:Any), println("" a); reads: println(a:Any):() = println("" a)     (* with concat also works for tuples *)
  - `FTupleLike.java:60` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FTupleLike.java): no word to check; reads: res.append(',');
  - `Library/FortressLibrary.fss:4488` (Library/FortressLibrary.fss): holds cast[\Object\](b).asString; reads: opr ||(a:String, b:Any):String = a || cast[\Object\](b).asString
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:471` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): no word to check; reads: println(a: Any, b: Any): () = jPrintln(("(" str(a) ", " str(b) ")").asJavaString)
- in the old line, not in the new: `:4412`, `:4513`, `Library/FortressLibrary.fss:4402-4410`, `opr \|\|(self, b:Any)`
- every check passes

## Row 374, rewritten (1182 characters)
- lengths: row 1182 of 1,200, claim 214 of 300, notes 699 of 700
- reproducer `ProjectFortress/tests/XXXFnRenderRungS.fss`: exists
- citations:
  - `Library/FortressLibrary.fss:4549` (Library/FortressLibrary.fss): words moved: cast[\Object\](b).asString at :4488; reads: println(a:Any):() = println("" a)     (* with concat also works for tuples *)
  - `Library/FortressLibrary.fss:4488` (Library/FortressLibrary.fss): words moved: println(a:Any) at :4549; println("" a) at :4549; reads: opr ||(a:String, b:Any):String = a || cast[\Object\](b).asString
  - `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:37-41` (ProjectFortress/LibraryBuiltin/FortressBuiltin.fss): holds trait Object; reads: trait Object extends Any
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:460` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): holds println(x:Object); reads: println(x:Object):() = jPrintln(x.asString.asJavaString)
- in the old line, not in the new: `:4412`, `Library/FortressLibrary.fss:4513`, `objects.tex`, `opr \|\|(self, b:Any)`
- every check passes

## Row 75, rewritten (1086 characters)
- lengths: row 1086 of 1,200, claim 170 of 300, notes 683 of 700
- reproducer `explorations/tparallel.fss`: exists
- citations:
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:23` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi): holds nanoTime(): RR64; reads: nanoTime(): RR64
  - `CompilerBuiltin.fss:352` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): holds nanoTime(): RR64; reads: nanoTime(): RR64 = jNanoTime()
  - `Library/FortressLibrary.fsi:2563` (Library/FortressLibrary.fsi): no word to check; reads: nanoTime():ZZ64
  - `Library/FortressLibrary.fss:4522` (Library/FortressLibrary.fss): holds nanoTime():ZZ64, simpleLongArith.longNanoTime; reads: nanoTime():ZZ64 = builtinPrimitive("com.sun.fortress.nativeHelpers.simpleLongArith.longNanoTime")
- in the old line, not in the new: `63e420a33`, `Library/FortressLibrary.fsi:2547`
- every check passes

## Row 76, rewritten (1052 characters)
- lengths: row 1052 of 1,200, claim 110 of 300, notes 680 of 700
- reproducer `ProjectFortress/compiler_tests/XXXJuxtConcatRungS.test`: exists
- citations:
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:406` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): no word to check; reads: opr juxtaposition(self, b:Object): String = self ||| b
  - `Library/FortressLibrary.fss:4512-4514` (Library/FortressLibrary.fss): no word to check; reads: opr juxtaposition(a:Any, b:String):String = (""||a) || b
- in the old line, not in the new: `Library/FortressLibrary.fss:4328-4329`
- every check passes

## Row 458, rewritten (982 characters)
- lengths: row 982 of 1,200, claim 221 of 300, notes 664 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fss:4909-4916` (Library/FortressLibrary.fss): words moved: SimpleFilterGenerator2 at :4852,4859,4860; reads: andRelCond[\E\](p : Generator[\ E \] -> RelationalPredicateCondition[\ E \] , q : Generator[\ E \] -> RelationalPredicateCondition[\ E \] ) 
  - `Library/FortressLibrary.fss:4860` (Library/FortressLibrary.fss): words moved: andRelCond at :4909,4915; reads: SimpleFilterGenerator2[\E\](self.g, andCondCombine[\E\](self.p, p'))
  - `Library/FortressLibrary.fss:4862` (Library/FortressLibrary.fss): words moved: andRelCond at :4909,4915; SimpleFilterGenerator2 at :4852,4859,4860; reads: __generate2filtered[\ R, L1, L2 \](q : ActualReduction[\ R, L1 \], r : ActualReduction[\ R, L2 \], p' : Generator[\E\] -> Condition[\()\], f
  - `Library/Generator2.fss:88-93` (Library/Generator2.fss): holds relational; reads: relational[\E\](p : Generator[\E\] -> Condition[\()\]) : Boolean =
  - `explorations/compile-ladder/rung-exclusion-remainder/probes/values/HValues.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `:4516`, `:4556-4566`, `FilterGenerator2`, `Generator[\E\] -> RelationalPredicateCondition[\E\]`, `Library/FortressLibrary.fss:4514`, `OverloadedFunction.java`, `OverloadedFunction.java:490-498`, `true`
- every check passes

## Row 313, rewritten (1122 characters)
- lengths: row 1122 of 1,200, claim 273 of 300, notes 662 of 700
- reproducer `none`: exists
- citations: none with lines
- in the old line, not in the new: nothing
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 140: row 140: rewritten (908 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 338: row 338: rewritten (1051 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 579: row 579: rewritten (1060 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 321: row 321: rewritten (1124 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 369: row 369: rewritten (1078 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 374: row 374: rewritten (1182 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 75: row 75: rewritten (1086 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 76: row 76: rewritten (1052 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 458: row 458: rewritten (982 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 313: row 313: rewritten (1122 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 10 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 10 lines, 0 failing, every check passes.
