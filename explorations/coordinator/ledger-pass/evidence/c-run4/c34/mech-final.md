# Mechanical check of c34, the judge's files, base c124c6b65

## Row 255, rewritten (956 characters)
- lengths: row 956 of 1,200, claim 191 of 300, notes 678 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fsi:180` (Library/FortressLibrary.fsi): no word to check; reads: opr <(self, other:T): Boolean
  - `explorations/apl/base/AplCore.fss:1698` (explorations/apl/base/AplCore.fss): holds requires { aplAllScalar(rs) }; reads: aplAsmV(rs: Array[\Any,ZZ32\]): Array[\RR64,ZZ32\] requires { aplAllScalar(rs) } =
  - `explorations/apl/base/AplCore.fss:1685-1688` (explorations/apl/base/AplCore.fss): holds aplIsScalar, aplScalarOf; reads: aplIsScalar(x: Any): Boolean =
- in the old line, not in the new: `AplCore.fss`, `AplCore.fss:1674:20-34: CallerViolation`, `Number`, `w02_lib`
- every check passes

## Row 436, rewritten (1160 characters)
- lengths: row 1160 of 1,200, claim 183 of 300, notes 588 of 700
- reproducer `ProjectFortress/tests/XXXEmptyGroupSumRungF.fss`: exists
- citations:
  - `Specification-1.0-frozen/advanced-lib/algebraic-constraints.tex:794-797` (Specification-1.0-frozen/advanced-lib/algebraic-constraints.tex): no word to check; reads: If the same value is both a left identity and a right identity for \EXP{\odot},
  - `Library/FortressLibrary.fss:3447` (Library/FortressLibrary.fss): words moved: else => cast[\T\](0) at :3408; reads: empty(): T = additiveIdentity[\T\]()
  - `Library/FortressLibrary.fss:3408` (Library/FortressLibrary.fss): words moved: additiveIdentity at :2595,3394,3447; reads: else => cast[\T\](0)
  - `Library/FortressLibrary.fss:3425` (Library/FortressLibrary.fss): words moved: multiplicativeIdentity at :3411,3463; PROD at :3469,3472,3473; reads: else => cast[\T\](1)
- in the old line, not in the new: `:3394`, `:3411`, `Library/FortressLibrary.fss:3433`, `coerces`, `compile-ladder/rung-library-distribute/REPORT.md`, `where`
- every check passes

## Row 481, rewritten (968 characters)
- lengths: row 968 of 1,200, claim 156 of 300, notes 609 of 700
- reproducer `ProjectFortress/compiler_tests/XXXRangeEqRungJ.fss`: exists
- citations:
  - `Library/CompilerLibrary.fsi:111` (Library/CompilerLibrary.fsi): holds Equality[\GeneratorZZ32\]; reads: trait GeneratorZZ32 extends Equality[\GeneratorZZ32\] excludes { Boolean, Number, Character, String }   (*) excludes { Boolean, AllGenerator
  - `Library/CompilerAlgebra.fss:26` (Library/CompilerAlgebra.fss): holds self === other; reads: opr =(self, other: T): Boolean = (self === other)
- in the old line, not in the new: nothing
- every check passes

## Row 603, rewritten (1101 characters)
- lengths: row 1101 of 1,200, claim 256 of 300, notes 698 of 700
- reproducer `ProjectFortress/tests/RangeDeclarations.fss`: exists
- citations:
  - `Library/FortressLibrary.fss:4319-4320` (Library/FortressLibrary.fss): holds SimpleMappedSeqIndexed; reads: object SimpleMappedSeqIndexed[\E,F,I extends Index\](g0: Indexed[\E,I\], f0: E->F)
  - `Library/FortressLibrary.fss:3751-3762` (Library/FortressLibrary.fss): words moved: SimpleMappedSeqIndexed at :4319,4331,4333; reads: trait MappedGenerator[\E,F\] extends SomeMappedGenerator[\F\]
  - `ExportChecker.scala:733-734` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala): no word to check; reads: if ( ! equalListTraitTypeWheres(extendsL, extendsR) )
  - `Library/FortressLibrary.fss:3771-3772` (Library/FortressLibrary.fss): no word to check; reads: object SimpleMappedIndexed[\E,F,I extends Index\](g0: Indexed[\E,I\], f0: E->F)
  - `ProjectFortress/tests/RangeDeclarations.fss:58` (ProjectFortress/tests/RangeDeclarations.fss): no word to check; reads: assert(seq(0#4).map[\ZZ32\](fn (x:ZZ32):ZZ32 => 2 x).reverse.asString, "SimpleReversedIndexed(mapped(seq(0,2,4,6)))", "today's value: seq(0#
- in the old line, not in the new: `:3565-3577`, `:3585-3586`, `:58`, `Library/FortressLibrary.fss:4155-4156`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:733-734`
- every check passes

## Row 609, rewritten (1043 characters)
- lengths: row 1043 of 1,200, claim 206 of 300, notes 577 of 700
- reproducer `ProjectFortress/tests/XXXSubscriptImplicitStridedRange.fss`: exists
- citations:
  - `Library/RangeInternals.fss:873-877` (Library/RangeInternals.fss): holds stride DIVIDES (r-n); reads: fullScalarRange(r - ( |n| - 1 ) str, r, str)
  - `Library/RangeInternals.fss:3` (Library/RangeInternals.fss): words moved: stride DIVIDES (r-n) at :876; reads: All rights reserved.
  - `Library/FortressLibrary.fss:4383` (Library/FortressLibrary.fss): holds self.bounds.narrowToRange(r0); reads: r1 = self.bounds.narrowToRange(r0)     (* This will complete r0 if it is incomplete, and throw a bounds exception when necessary *)
- in the old line, not in the new: `:715-719`, `Library/FortressLibrary.fss:4214-4221`, `Library/RangeInternals.fss:687-722`
- every check passes

## Row 659, rewritten (847 characters)
- lengths: row 847 of 1,200, claim 144 of 300, notes 605 of 700
- reproducer `none`: exists
- citations:
  - `Library/RangeInternals.fss:639-640` (Library/RangeInternals.fss): words moved: combine2D(i:ScalarRange, j:ScalarRange) at :207; reads: combine2D(i:BoundedScalarRange, j:BoundedScalarRange): BoundedRange2D =
  - `Library/RangeInternals.fss:207-208` (Library/RangeInternals.fss): words moved: combine2D(i:BoundedScalarRange, j:BoundedScalarRange) at :639; reads: combine2D(i:ScalarRange, j:ScalarRange): Range2D =
- in the old line, not in the new: `:217`, `Library/RangeInternals.fss:590-591`, `combine2D(BoundedScalarRange, BoundedScalarRange)`, `combine2D(ScalarRange, ScalarRange)`
- every check passes

## Row 661, rewritten (1064 characters)
- lengths: row 1064 of 1,200, claim 259 of 300, notes 666 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fsi:2421` (Library/FortressLibrary.fsi): holds opr :[\I\](r: Range[\I\], stride:I): Range[\I\]; reads: opr :[\I\](r: Range[\I\], stride:I): Range[\I\]
  - `Library/FortressLibrary.fsi:2189` (Library/FortressLibrary.fsi): no word to check; reads: trait Range[\I\] extends { StandardPartialOrder[\Range[\I\]\], Contains[\I\] }
  - `Library/FortressLibrary.fss:4944` (Library/FortressLibrary.fss): words moved: SUFFIX_SUM at :4942; reads: for i <- seq((0 # (|x| - 1)).reverse) do result[i] += result[i+1] end
  - `Library/Shuffle.fss:23` (Library/Shuffle.fss): no word to check; reads: for i <- seq((|a| - 1):-1:-1) do
- in the old line, not in the new: `(0 # n).reverse`, `:2163`, `Library/FortressLibrary.fsi:2391`, `Library/FortressLibrary.fss:4686`
- every check passes

## Row 799, rewritten (806 characters)
- lengths: row 806 of 1,200, claim 181 of 300, notes 531 of 700
- reproducer `none`: exists
- citations:
  - `Library/List.fsi:57-61` (Library/List.fsi): holds AnyList, addLeft, addRight, comprises { List[\E\] } where [\E\], addLeft(e:Any): AnyList, addRight(e:Any): AnyList; reads: trait AnyList excludes { Number, HasRank, String }
  - `Library/List.fss:89-90` (Library/List.fss): words moved: comprises { List[\E\] } where [\E\] at :87; reads: addLeft(e:Any): AnyList = singleton(e) || self
- in the old line, not in the new: `sed -n 55,60p Library/List.fsi`
- every check passes

## Row 102, closed by d846e3644, test ProjectFortress/tests/FlatTowerRungF.fss
- commit: d846e3644 2026-09-27 The one library's number types are siblings under Number, SUM and PROD are typed, and rationals are exact
- test: ProjectFortress/tests/FlatTowerRungF.fss
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 255: row 255: rewritten (956 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 436: row 436: rewritten (1160 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 481: row 481: rewritten (968 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 603: row 603: rewritten (1101 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 609: row 609: rewritten (1043 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 659: row 659: rewritten (847 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 661: row 661: rewritten (1064 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 799: row 799: rewritten (806 characters); its earlier line is in fortress-gap-ledger-history.md
    applied close 102: row 102: FIXED by d846e3644, test ProjectFortress/tests/FlatTowerRungF.fss; its earlier line is in fortress-gap-ledger-history.md
    apply.py: 9 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 9 lines, 0 failing, every check passes.
