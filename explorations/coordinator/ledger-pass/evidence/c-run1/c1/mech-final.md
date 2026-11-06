# Mechanical check of c1, the judge's files, base c124c6b65

## Row 188, rewritten (918 characters)
- lengths: row 918 of 1,200, claim 220 of 300, notes 607 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fsi:382` (Library/FortressLibrary.fsi): holds truncate(self):ZZ64; reads: truncate(self):ZZ64
  - `explorations/apl/v1-probes/p01_numfmt.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `ProjectFortress/tests/NativeHelperFamilyFloatWalk.fss:240` (ProjectFortress/tests/NativeHelperFamilyFloatWalk.fss): no word to check; reads: assert(truncate(a), 2, "truncate")
- in the old line, not in the new: `0ff5eae27~1`, `Cannot find definition for method narrow given receiver 7: ZZ64`, `Cannot find definition for method truncate given receiver 7.0`, `Library/FortressLibrary.fsi:332`, `RR64 → ZZ32`, `RR64.truncate()`, `explorations/apl/v1/base`, `narrow`, `p01c_numfmt.fss`
- every check passes

## Row 283, rewritten (1013 characters)
- lengths: row 1013 of 1,200, claim 251 of 300, notes 666 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fsi:645` (Library/FortressLibrary.fsi): holds narrow(self):ZZ32; reads: narrow(self):ZZ32
  - `Library/FortressLibrary.fsi:379` (Library/FortressLibrary.fsi): words moved: narrow(self):ZZ32 at :589,645; reads: opr |\self/| : ZZ64
  - `explorations/apl-probes/d21_narrow.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `ProjectFortress/tests/NativeHelperFamilyIntegersWalk.fss:71` (ProjectFortress/tests/NativeHelperFamilyIntegersWalk.fss): holds narrow; reads: assert(narrow(s7), 7, "ZZ64 narrow")
- in the old line, not in the new: `:415`, `Cannot find definition for method narrow given receiver 3: ZZ64`, `Library/FortressLibrary.fsi:529`, `Library/FortressLibrary.fss`, `Library/FortressLibrary.fss:762`, `explorations/coordinator/tools/old-fortress.sh`, `narrow(self): ZZ32`, `opr \|\self/\| : ZZ`, `row 281`, `while`
- every check passes

## Row 866, rewritten (1197 characters)
- lengths: row 1197 of 1,200, claim 276 of 300, notes 695 of 700
- reproducer `ProjectFortress/compiler_tests/XXXObjectExtendsZZ32Compiled.test`: exists
- citations:
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:210` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi): words moved: comprises at :681,701,722; reads: trait ZZ32 extends { Number, Equality[\ZZ32\], StandardTotalOrder[\ZZ32\] } excludes { ZZ64, RR32, RR64 }
  - `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FZZ32.java:14` (ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FZZ32.java): no word to check; reads: public final class FZZ32 extends fortress.CompilerBuiltin.ZZ32.DefaultTraitMethods
  - `Library/FortressLibrary.fsi:536-538` (Library/FortressLibrary.fsi): no word to check; reads: trait ZZ32 extends { AnyIntegral, Integral[\ZZ32\], Index }
- in the old line, not in the new: nothing
- every check passes

## Row 698, rewritten (1156 characters)
- lengths: row 1156 of 1,200, claim 260 of 300, notes 679 of 700
- reproducer `ProjectFortress/compiler_tests/XXXOverloadZZ32BesideUserTrait.test`: exists
- citations:
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:210` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi): words moved: comprises at :681,701,722; reads: trait ZZ32 extends { Number, Equality[\ZZ32\], StandardTotalOrder[\ZZ32\] } excludes { ZZ64, RR32, RR64 }
  - `Library/FortressLibrary.fsi:536-538` (Library/FortressLibrary.fsi): no word to check; reads: trait ZZ32 extends { AnyIntegral, Integral[\ZZ32\], Index }
  - `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:125` (ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi): holds value object Int extends ZZ32; reads: value object Int extends ZZ32
- in the old line, not in the new: `Library/FortressLibrary.fsi:531-533`, `compiler_tests/XXXOverloadZZ32BesideUserTrait.test`, `tests/OverloadZZ32BesideUserTraitWalk.fss`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 188: row 188: rewritten (918 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 283: row 283: rewritten (1013 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 866: row 866: rewritten (1197 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 698: row 698: rewritten (1156 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 4 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 4 lines, 0 failing, every check passes.
