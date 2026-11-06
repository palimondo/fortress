# Mechanical check of c-run4-probe, the judge's files, base c124c6b65

## Row 377, rewritten (957 characters)
- lengths: row 957 of 1,200, claim 214 of 300, notes 623 of 700
- reproducer `none`: exists
- citations:
  - `explorations/compile-ladder/rung-default-rendering/probes/skeptic/Sk2OldNew.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `compiler/codegen/CodeGen.java:2874` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): words moved: Nothing at :3050; reads: throw new Error("\n"+NodeUtil.getSpan(body)+": Error trying to close method scope.\n" + mv.getText(),t);
- in the old line, not in the new: `Boolean`, `Character`, `CodeGen`, `Just`, `NN32`, `Object`, `RR32`, `RR64`, `Sk2NewOne.fss`, `Sk2OldNew.fss`, `String`, `ZZ32Vector`, `ZZ64`, `\|\|`, `compiler/codegen/CodeGen.java:2817-2822`
- every check passes

## Row 100, rewritten (1031 characters)
- lengths: row 1031 of 1,200, claim 272 of 300, notes 670 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fsi:1386-1393` (Library/FortressLibrary.fsi): words moved: opr[r: Range[\ZZ32\]] at :1598,1630; reads: (** %DelegatedIndexed% is an indexed generator that has recourse to
  - `explorations/gap-ledger-probes/g22.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `Library/FortressLibrary.fss:2055` (Library/FortressLibrary.fss): words moved: opr[r: Range[\ZZ32\]] at :2397,2455; reads: opr[r:Range[\ZZ32\]] : ZeroIndexed[\E\]
  - `explorations/run-b/probes/worker/w07_subscripts.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `** bug! MethodClosure _[_](r:Range[\FortressLibrary.ZZ32\]):ZeroIndexed[\E\]/…/FortressLibrary.fss:1720:5-43 has neither body nor def instanceof Method`, `Library/FortressLibrary.fss:1912`, `opr[Generator[\ZZ32\]]`
- every check passes

## Row 221, rewritten (1075 characters)
- lengths: row 1075 of 1,200, claim 221 of 300, notes 680 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fss:2653-2655` (Library/FortressLibrary.fss): no word to check; reads: trait Array2[\T, nat b0, nat s0, nat b1, nat s1\]
  - `explorations/apl/base/AplCore.fss:52` (explorations/apl/base/AplCore.fss): no word to check; reads: aplVec(n: ZZ32, f: ZZ32 -> RR64): Array[\RR64,ZZ32\] = array[\RR64\](n).fill(f)
  - `AplCore.fss:42` (explorations/apl/base/AplCore.fss): no word to check; reads: elif (1.0 (|\ v /|)) = v then ("" (|\ v /|))
- in the old line, not in the new: `BIG MAX[u <- v] u = 5.0`, `Library/FortressLibrary.fss:2492-2494`, `Number`, `PROD`, `RR64`, `SUM[u <- v] u = 14.0`, `aplMaxLast`, `aplProdLast`, `aplSumFirst`, `comprehension = <\|30.0, 10.0, 40.0, 10.0, 50.0\|>`, `except { opr BIG + }`, `for`, `row 218`, `v[2] = 4`
- every check passes

## Row 694, rewritten (1126 characters)
- lengths: row 1126 of 1,200, claim 288 of 300, notes 689 of 700
- reproducer `none`: exists
- citations: none with lines
- in the old line, not in the new: nothing
- every check passes

## Row 555, rewritten (1115 characters)
- lengths: row 1115 of 1,200, claim 279 of 300, notes 694 of 700
- reproducer `none`: exists
- citations: none with lines
- in the old line, not in the new: `ProjectFortress/tests/InferTwoCommonParentsWalk.fss`, `trait Red extends Cmp[\Red\]`, `trait Round extends Cmp[\Round\]`
- every check passes

## Row 432, rewritten (1056 characters)
- lengths: row 1056 of 1,200, claim 269 of 300, notes 687 of 700
- reproducer `none`: exists
- citations:
  - `explorations/compile-ladder/rung-flat-tower/bare-sum.sh`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: nothing
- every check passes

## Row 817, rewritten (1121 characters)
- lengths: row 1121 of 1,200, claim 275 of 300, notes 676 of 700
- reproducer `ProjectFortress/demos/trips.fss`: exists
- citations:
  - `ProjectFortress/demos/trips.fss:76` (ProjectFortress/demos/trips.fss): no word to check; reads: approx -= (approx - (n DIV approx) + 1) DIV 2
  - `ProjectFortress/demos/trips.fss:113` (ProjectFortress/demos/trips.fss): no word to check; reads: generator ("Naive search: Triple loop, then filter", 25, fn (max:ZZ32) =>
  - `ProjectFortress/demos/trips.fss:130` (ProjectFortress/demos/trips.fss): no word to check; reads: generator ("Naive search: Double loop, calculate c", 100, fn (max:ZZ32) =>
  - `ProjectFortress/demos/trips.fss:139` (ProjectFortress/demos/trips.fss): no word to check; reads: generator ("Naive search: fold a<b & c<max into range bounds", 100, fn (max:ZZ32) =>
  - `ProjectFortress/demos/trips.fss:146` (ProjectFortress/demos/trips.fss): no word to check; reads: generator ("Naive search: fold a<b & c<max into range bounds", 100, fn (max:ZZ32) =>
  - `ProjectFortress/demos/trips.fss:153` (ProjectFortress/demos/trips.fss): no word to check; reads: generator ("Naive search: promote 2 as a common factor", 100, fn (max:ZZ32) =>
  - `ProjectFortress/demos/trips.fss:199` (ProjectFortress/demos/trips.fss): no word to check; reads: generator ("Euclid's formula, naive bounds, no binding", 100, fn (max:ZZ32) =>
  - `ProjectFortress/demos/trips.fss:216` (ProjectFortress/demos/trips.fss): no word to check; reads: generator ("Euclid's, (m^2+n^2<=max) & n<m => bounds", 100000, fn (max:ZZ32) =>
  - `ProjectFortress/demos/trips.fss:303` (ProjectFortress/demos/trips.fss): holds seq; reads: for  n <- seq(min:max:stride) do
  - `ProjectFortress/demos/trips.fss:82` (ProjectFortress/demos/trips.fss): no word to check; reads: perfectSqrt(n:ZZ64):Maybe[\ZZ32\] = do
  - `ProjectFortress/demos/trips.fss:76` (ProjectFortress/demos/trips.fss): no word to check; reads: approx -= (approx - (n DIV approx) + 1) DIV 2
  - `ProjectFortress/demos/trips.fss:232` (ProjectFortress/demos/trips.fss): no word to check; reads: tripsTo(trips, max:ZZ32) = { t | t<-trips, t.a <= max, t.b <= max, t.c <= max }
  - `ProjectFortress/demos/trips.fss:255` (ProjectFortress/demos/trips.fss): no word to check; reads: allSame (xs):Boolean = do
  - `ProjectFortress/demos/trips.fss:263` (ProjectFortress/demos/trips.fss): no word to check; reads: compareTwo(ps,qs):Boolean = do
  - `ProjectFortress/demos/trips.fss:286` (ProjectFortress/demos/trips.fss): no word to check; reads: tripsAndTime = <|runAndTime(g,n) | g<-generators, n<=g.max|>
  - `scala_src/typechecker/OverloadingChecker.scala:129` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala): no word to check; reads: f.getReturnType.unwrap,
- in the old line, not in the new: `OverloadingChecker.scala`, `OverloadingChecker.scala:129`, `row 621`, `row 710`
- every check passes

## Row 547, rewritten (1162 characters)
- lengths: row 1162 of 1,200, claim 234 of 300, notes 695 of 700
- reproducer `explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh`: exists
- citations:
  - `scala_src/typechecker/TraitTable.scala:82-84` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TraitTable.scala): no word to check; reads: val candidate = JOption.wrap(globalEnv.api(name).typeConses().get(simpleName))
  - `ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:275` (ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java): no word to check; reads: errors.addAll(new OverloadingChecker(index, env).checkOverloading());
- in the old line, not in the new: `70d5486f9`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TraitTable.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TraitTable.scala:82-84`, `XXXFunctionalMethodMeetBetweenTraits`, `compiler/StaticChecker.java`, `compiler/StaticChecker.java:275`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 377: row 377: rewritten (957 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 100: row 100: rewritten (1031 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 221: row 221: rewritten (1075 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 694: row 694: rewritten (1126 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 555: row 555: rewritten (1115 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 432: row 432: rewritten (1056 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 817: row 817: rewritten (1121 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 547: row 547: rewritten (1162 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 8 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 8 lines, 0 failing, every check passes.
