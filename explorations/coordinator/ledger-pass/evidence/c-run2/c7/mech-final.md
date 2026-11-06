# Mechanical check of c7, the judge's files, base c124c6b65

## Row 328, rewritten (1033 characters)
- lengths: row 1033 of 1,200, claim 231 of 300, notes 642 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:912-917` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): words moved: trait IntLiteral at :883; reads: opr <(self, other:IntLiteral): Boolean = self.asZZ64 < other.asZZ64
  - `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FIntLiteral.java:74-77` (ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FIntLiteral.java): holds ZZ64; reads: public FZZ64 asZZ64() {
  - `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FIntLiteral.java:63-65` (ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FIntLiteral.java): words moved: ZZ64 at :74,75,76; reads: public Error outOfRange(String t) {
  - `explorations/compiler-probes/p37.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `row 317`, `true`
- every check passes

## Row 440, rewritten (1145 characters)
- lengths: row 1145 of 1,200, claim 243 of 300, notes 621 of 700
- reproducer `ProjectFortress/tests/XXXRationalUnorderedRungP.fss`: exists
- citations:
  - `Library/FortressLibrary.fss:597-598` (Library/FortressLibrary.fss): no word to check; reads: opr =(self, other:QQ):Boolean =
  - `Library/FortressLibrary.fss:596` (Library/FortressLibrary.fss): no word to check; reads: (* Note that 0/0 = 0/0 is supposed to be true (//unlike// the behavior of floating-point NaN) *)
  - `Library/FortressLibrary.fss:605` (Library/FortressLibrary.fss): no word to check; reads: opr <=(self, other:QQ):Boolean = (self < other) OR (self = other)
  - `Library/FortressLibrary.fss:607` (Library/FortressLibrary.fss): no word to check; reads: opr >=(self, other:QQ):Boolean = (other <= self)
  - `Library/FortressLibrary.fss:224-229` (Library/FortressLibrary.fss): no word to check; reads: opr CMP(self, other:T): Comparison =
  - `Library/FortressLibrary.fss:610-619` (Library/FortressLibrary.fss): no word to check; reads: opr MIN(self, other:QQ):QQ =
  - `Library/FortressLibrary.fss:658-661` (Library/FortressLibrary.fss): no word to check; reads: opr MINNUM(self, other:QQ):QQ =
- in the old line, not in the new: `NanQQ.fss`
- every check passes

## Row 456, rewritten (1031 characters)
- lengths: row 1031 of 1,200, claim 198 of 300, notes 684 of 700
- reproducer `ProjectFortress/tests/ExclusionRemainderRungH.fss:24-30`: exists
- citations:
  - `ProjectFortress/tests/ExclusionRemainderRungH.fss:24-30` (ProjectFortress/tests/ExclusionRemainderRungH.fss): holds LessThan < EqualTo, LessThan CMP EqualTo; reads: assert(LessThan CMP EqualTo, GreaterThan, "today's value, the converse of LessThan < EqualTo: row 456")
  - `Library/FortressLibrary.fss:187` (Library/FortressLibrary.fss): no word to check; reads: opr CMP(self, other:TotalComparison): TotalComparison = GreaterThan
  - `Library/FortressLibrary.fss:199` (Library/FortressLibrary.fss): no word to check; reads: opr CMP(self, other:TotalComparison): TotalComparison = LessThan
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:1551` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): no word to check; reads: opr CMP(self, other:TotalComparison): TotalComparison = LessThan
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:1571` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): no word to check; reads: opr CMP(self, other:TotalComparison): TotalComparison = GreaterThan
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:159-160` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): words moved: StandardTotalOrder at :348,349,389; reads: simpleLongArith.longAdd => jLongAdd,
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:186` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): words moved: StandardTotalOrder at :348,349,389; reads: simpleLongArith.longGT => jLongGT,
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:198` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): words moved: StandardTotalOrder at :348,349,389; reads: simpleLongArith.longBitLeftShift => jLongBitLeftShift,
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:209` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): words moved: StandardTotalOrder at :348,349,389; reads: simpleDoubleArith.doubleGT => jDoubleGT,
  - `ExclusionRemainderRungH.fss:24-30` (ProjectFortress/tests/ExclusionRemainderRungH.fss): no word to check; reads: assert(LessThan CMP EqualTo, GreaterThan, "today's value, the converse of LessThan < EqualTo: row 456")
  - `ExclusionRemainderRungH.fss:55` (ProjectFortress/tests/ExclusionRemainderRungH.fss): no word to check; reads: assert(c CMP d, GreaterThan, "today's value, the converse of LessThan < GreaterThan: row 456")
- in the old line, not in the new: `:197`, `:24-30`, `= LessThan`, `LessThan.CMP(self, other:TotalComparison) = GreaterThan`, `Library/FortressLibrary.fss:185`, `explorations/perf-probes/nat/triage.md`, `explorations/perf-probes/nat/triage.md:67`
- every check passes

## Row 462, rewritten (1013 characters)
- lengths: row 1013 of 1,200, claim 213 of 300, notes 694 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fss:167-168` (Library/FortressLibrary.fss): no word to check; reads: opr CMP(self, other:Unordered): Comparison = Unordered
  - `ProjectFortress/tests/ExclusionRemainderRungH.fss:45` (ProjectFortress/tests/ExclusionRemainderRungH.fss): no word to check; reads: assert(LessThan CMP Unordered, Unordered, "today's value: LessThan CMP Unordered")
  - `ProjectFortress/tests/ExclusionRemainderRungH.fss:51` (ProjectFortress/tests/ExclusionRemainderRungH.fss): no word to check; reads: deny(LessThan < Unordered, "today's value: LessThan < Unordered")
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:1530` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): no word to check; reads: opr CMP(self, other: Unordered): Comparison = LessThan
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:1537` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): no word to check; reads: opr <(self, other: Unordered): Boolean = true
  - `explorations/compile-ladder/rung-exclusion-remainder/probes/skeptic/SkCmpTable.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `CMP`, `LEXICO`, `Library/FortressLibrary.fss:166-167`
- every check passes

## Row 484, rewritten (864 characters)
- lengths: row 864 of 1,200, claim 159 of 300, notes 512 of 700
- reproducer `ProjectFortress/tests/XXXNumeralWithNN32.fss`: exists
- citations:
  - `Library/FortressLibrary.fss:821-822` (Library/FortressLibrary.fss): no word to check; reads: coerce(x: ZZ32) = widen(x)
  - `Library/FortressLibrary.fss:994` (Library/FortressLibrary.fss): no word to check; reads: coerce(x: ZZ32) = big(x)
  - `Library/FortressLibrary.fss:997` (Library/FortressLibrary.fss): no word to check; reads: coerce(x: NN64) = do
- in the old line, not in the new: `2770550c3`, `9d2e4c856`, `CMP`, `MINMAX`, `StandardMax`, `StandardMinMax`, `StandardTotalOrder`, `b MAX 1`, `row 517`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 328: row 328: rewritten (1033 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 440: row 440: rewritten (1145 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 456: row 456: rewritten (1031 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 462: row 462: rewritten (1013 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 484: row 484: rewritten (864 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 5 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 5 lines, 0 failing, every check passes.
