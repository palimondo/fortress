# Mechanical check of r1, the writer's files, base aa6e4ebee

## Row 349, rewritten (1154 characters)
- lengths: row 1154 of 1,200, claim 247 of 300, notes 693 of 700
- reproducer `ProjectFortress/compiler_tests/XXXZZNarrowRungP.test`: exists
- citations:
  - `Library/FortressLibrary.fsi:646` (Library/FortressLibrary.fsi): words moved: trait ZZ at :536,593,651; trait ZZ64 at :593; reads: widen(self):ZZ64
  - `Library/FortressLibrary.fsi:698-699` (Library/FortressLibrary.fsi): words moved: trait ZZ at :536,593,651; trait ZZ64 at :593; reads: narrow(self): ZZ32
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:103-145` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi): words moved: widen at :269,328; trait ZZ64 at :147; narrow at :206,386; reads: trait ZZ extends { Number, Equality[\ZZ\] } excludes { RR64, ZZ64, ZZ32, NN32, NN64, IntLiteral }
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:147-208` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi): words moved: widen at :269,328; reads: trait ZZ64 extends { Number, Equality[\ZZ64\] } excludes { RR64 , ZZ }
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:580` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): words moved: narrow at :659,879; reads: coerce(x: ZZ32) = jIntToLong(x)
  - `explorations/compile-ladder/rung-int-conversions/probes/skeptic/SK3Tower.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: nothing
- every check passes

## Row 71, rewritten (1049 characters)
- lengths: row 1049 of 1,200, claim 288 of 300, notes 626 of 700
- reproducer `none`: exists
- citations:
  - `CovariantCollection.fsi:19` (Library/CovariantCollection.fsi): words moved: MonoidReduction at :53; Comprehension at :61; reads: abstract dirtyIAF[\R\](a:ImmutableArray[\R,ZZ32\], i:ZZ32): ()
  - `CovariantCollection.fsi:25` (Library/CovariantCollection.fsi): words moved: MonoidReduction at :53; Comprehension at :61; reads: toImmutableArray(): ImmutableArray[\T, ZZ32\]
  - `CovariantCollection.fsi:26` (Library/CovariantCollection.fsi): words moved: ImmutableArray at :19,25; MonoidReduction at :53; Comprehension at :61; reads: toArray(): Array[\T, ZZ32\]
  - `CovariantCollection.fsi:27` (Library/CovariantCollection.fsi): words moved: ImmutableArray at :19,25; MonoidReduction at :53; Comprehension at :61; reads: assignToArray(res: Array[\T, ZZ32\]): ()
  - `CovariantCollection.fsi:53` (Library/CovariantCollection.fsi): words moved: ImmutableArray at :19,25; Array at :19,25,26; Comprehension at :61; reads: object CVReduction[\T\] extends MonoidReduction[\AnyCovColl\]
  - `CovariantCollection.fsi:61` (Library/CovariantCollection.fsi): words moved: ImmutableArray at :19,25; Array at :19,25,26; MonoidReduction at :53; reads: Comprehension[\T, R, AnyCovColl, AnyCovColl\]
  - `Library/List.fsi:69` (Library/List.fsi): words moved: Array at :16; MonoidReduction at :137; Comprehension at :116; LexicographicOrder at :70; BigReduction at :119; reads: trait List[\E\] extends { AnyList, ZeroIndexed[\E\], Equality[\List[\E\]\],
  - `Library/List.fsi:70` (Library/List.fsi): words moved: Array at :16; MonoidReduction at :137; Comprehension at :116; ZeroIndexed at :69; BigReduction at :119; Indexed at :69,126; reads: LexicographicOrder[\List[\E\],E\] where { E extends StandardTotalOrder[\E\] } }
  - `Library/List.fsi:116` (Library/List.fsi): words moved: Array at :16; MonoidReduction at :137; ZeroIndexed at :69; LexicographicOrder at :70; BigReduction at :119; Indexed at :69,126; reads: opr BIG <|[\T\]|>:Comprehension[\T,List[\T\],AnyCovColl,AnyCovColl\]
  - `Library/List.fsi:119` (Library/List.fsi): words moved: Array at :16; MonoidReduction at :137; Comprehension at :116; ZeroIndexed at :69; LexicographicOrder at :70; Indexed at :69,126; reads: opr BIG CONCAT[\T\](): BigReduction[\List[\T\],List[\T\]\]
  - `Library/List.fsi:126` (Library/List.fsi): words moved: Array at :16; MonoidReduction at :137; Comprehension at :116; ZeroIndexed at :69; LexicographicOrder at :70; BigReduction at :119; reads: concat[\E\](lists:Indexed[\List[\E\],ZZ32\]):List[\E\]
  - `Library/List.fsi:137` (Library/List.fsi): words moved: Array at :16; Comprehension at :116; ZeroIndexed at :69; LexicographicOrder at :70; BigReduction at :119; Indexed at :69,126; reads: object Concat[\E\] extends MonoidReduction[\ List[\E\] \]
  - `Library/CompilerLibrary.fsi:272` (Library/CompilerLibrary.fsi): holds HasRank; reads: trait HasRank extends Equality[\HasRank\] excludes { Number }
  - `Library/CompilerLibrary.fsi:221` (Library/CompilerLibrary.fsi): words moved: HasRank at :269,272; reads: value trait Maybe[\T extends Any\] extends { Condition[\T\] }
- in the old line, not in the new: `List.fsi`
- every check passes

## Row 442, rewritten (1197 characters)
- lengths: row 1197 of 1,200, claim 258 of 300, notes 664 of 700
- reproducer `ProjectFortress/compiler_tests/XXXInferPromoteNN32.test`: exists
- citations:
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:433-435` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi): holds FloatLiteral; reads: trait RR64 extends { Number, Equality[\RR64\] } excludes ZZ64
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:147-149` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi): words moved: FloatLiteral at :434,476,479; reads: trait ZZ64 extends { Number, Equality[\ZZ64\] } excludes { RR64 , ZZ }
  - `Library/CompilerAlgebra.fsi:16-22` (Library/CompilerAlgebra.fsi): holds StandardTotalOrder; reads: trait StandardTotalOrder[\T\] extends {Equality[\T\], AllStandardTotalOrders} comprises T
- in the old line, not in the new: `XXXZZNarrowRungP`
- every check passes

## Row 732, rewritten (1048 characters)
- lengths: row 1048 of 1,200, claim 223 of 300, notes 682 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:968` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): words moved: dumpMethodChaining at :915,4680,5411; reads: if (!fnl.body().isSome()) {
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:934-940` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): words moved: dumpMethodChaining at :915,4680,5411; reads: if (extendsClause.size() == 0 || !(extendsClause.get(0).getBaseType() instanceof TraitType)) {
- in the old line, not in the new: nothing
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 349: row 349: rewritten (1154 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 71: row 71: rewritten (1049 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 442: row 442: rewritten (1197 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 732: row 732: rewritten (1048 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 4 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base aa6e4ebee on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 4 lines, 0 failing, every check passes.
