# Mechanical check of p2, the judge's files, base de6d905f5

## Row 327, rewritten (1039 characters)
- lengths: row 1039 of 1,200, claim 248 of 300, notes 655 of 700
- reproducer `ProjectFortress/library_tests/ChooseTest3.fss:125`: exists
- citations:
  - `ProjectFortress/library_tests/ChooseTest3.fss:125` (ProjectFortress/library_tests/ChooseTest3.fss): words moved: ZZ64 at :18,27,122; reads: verifyChoose(3037000500+j, 2)
  - `ProjectFortress/library_tests/ChooseTest3.fss:122-123` (ProjectFortress/library_tests/ChooseTest3.fss): words moved: verifyChoose(3037000500+j, 2) at :125; reads: (*) These are the points that separate use of the fast ZZ64 algorithm from the
  - `ProjectFortress/library_tests/ChooseTest3.fss:125` (ProjectFortress/library_tests/ChooseTest3.fss): words moved: ZZ64 at :18,27,122; reads: verifyChoose(3037000500+j, 2)
  - `library_tests/IntegerChoose2.fss:56` (ProjectFortress/library_tests/IntegerChoose2.fss): holds fastSlowBoundary: ZZ64; reads: fastSlowBoundary: ZZ64 = 3037000500
  - `library_tests/IntegerChoose2.fss:115` (ProjectFortress/library_tests/IntegerChoose2.fss): words moved: fastSlowBoundary: ZZ64 at :56; reads: verifyChoose(fastSlowBoundary+j, 2)
  - `LibraryJUTest.java:36` (ProjectFortress/src/com/sun/fortress/tests/unit_tests/LibraryJUTest.java): words moved: .test at :12,39; reads: String testDir1 = ProjectProperties.BASEDIR + "library_tests";
- in the old line, not in the new: `fastSlowBoundary`, `verifyChoose`, `verifyChoose(-1257966796+j, 2)`
- every check passes

## Row 348, rewritten (1114 characters)
- lengths: row 1114 of 1,200, claim 252 of 300, notes 550 of 700
- reproducer `ProjectFortress/compiler_tests/XXXBoxDotSpellingsRungW.test`: exists
- citations:
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:587-599` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): no word to check; reads: opr BOXMINUS(self): ZZ64 = jLongWrappingNeg(self)
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:672-684` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): no word to check; reads: opr BOXMINUS(self): ZZ32 = jIntWrappingNeg(self)
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:766-778` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): no word to check; reads: opr BOXMINUS(self): NN32 = jMakeNN32FromZZ32(jUnsignedIntWrappingNeg(jMakeZZ32FromNN32(self)))
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:832-844` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss): no word to check; reads: opr BOXMINUS(self): NN64 = jMakeNN64FromZZ64(junsignedLongWrappingNeg(jMakeZZ64FromNN64(self)))
- in the old line, not in the new: nothing
- every check passes

## Row 350, rewritten (933 characters)
- lengths: row 933 of 1,200, claim 122 of 300, notes 698 of 700
- reproducer `none`: exists
- citations:
  - `simpleIntArith.java:97` (ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java): no word to check; reads: if (a==Integer.MIN_VALUE) throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");
  - `compiler/runtimeValues/Utility.java:45` (ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/Utility.java): no word to check; reads: public static FException makeFortressException(String name) {
  - `compiler/runtimeValues/Utility.java:28` (ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/Utility.java): no word to check; reads: public static FException makeFortressException(String name, String msg) {
  - `Specification/basic/exceptions.tex:68` (Specification/basic/exceptions.tex): no word to check; reads: {\tt~~}\pushtabs\=\+\(  \KWD{settable}\:\VAR{message}\COLON \TYP{Maybe}\llbracket\TYP{String}\rrbracket\)\\
  - `basic/operators/opr-overview.tex:155` (Specification/basic/operators/opr-overview.tex): no word to check; reads: For integer results, overflow throws an \TYP{IntegerOverflow}.
  - `interpreter/glue/prim/Int.java:258` (ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java): no word to check; reads: public static FortressError overflow() {
  - `explorations/compile-ladder/rung-int-conversions/probes/skeptic/SK4Bounds.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java`, `simpleIntArith.java:96`
- every check passes

## Row 429, rewritten (964 characters)
- lengths: row 964 of 1,200, claim 116 of 300, notes 686 of 700
- reproducer `none`: exists
- citations:
  - `Library/incomplete/basic/Fortress.Number.fsi:109-111` (Library/incomplete/basic/Fortress.Number.fsi): no word to check; reads: opr +(self): ZZ
  - `Library/FortressLibrary.fsi:561-563` (Library/FortressLibrary.fsi): holds DOTPLUS; reads: opr DOTMINUS(self):ZZ32
  - `Specification/basic-lib/basic-integers.tex:391-392` (Specification/basic-lib/basic-integers.tex): no word to check; reads: The unary addition operator \EXP{+} simply returns its argument.
- in the old line, not in the new: `.fss`, `:416-420`, `git show 7f57b836e:Library/FortressLibrary.fsi`
- every check passes

## Row 431, rewritten (947 characters)
- lengths: row 947 of 1,200, claim 275 of 300, notes 576 of 700
- reproducer `none`: exists
- citations:
  - `Library/QuickCheck.fss:322` (Library/QuickCheck.fss): words moved: genZZ.perturb at :341; reads: perturb(big(widen(obj) LSHIFT 32),
- in the old line, not in the new: `Long`, `ZZ32`, `explorations/compile-ladder/rung-flat-tower/REPORT.md`, `genQQ`, `perturb-probe.sh`, `propMapSizeInvariant2`
- every check passes

## Row 500, rewritten (1159 characters)
- lengths: row 1159 of 1,200, claim 258 of 300, notes 636 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic-lib/basic-integers.tex:760-761` (Specification-1.0-frozen/basic-lib/basic-integers.tex): words moved: countFactorsOfTwo(shift(x,1)) + 1 = 0 at :782; reads: %%   property FORALL(x) countBits(shift(x,1)) = countBits(x)
  - `Specification-1.0-frozen/basic-lib/basic-integers.tex:782` (Specification-1.0-frozen/basic-lib/basic-integers.tex): words moved: countBits(shift(x,1)) = countBits(x) at :760; reads: %%   property FORALL(x) countFactorsOfTwo(shift(x,1)) + 1 = 0
  - `Specification/basic-lib/basic-integers.tex:801-802` (Specification/basic-lib/basic-integers.tex): words moved: countFactorsOfTwo(shift(x,1)) + 1 = 0 at :823; reads: %%   property FORALL(x) countBits(shift(x,1)) = countBits(x)
  - `Specification/basic-lib/basic-integers.tex:823` (Specification/basic-lib/basic-integers.tex): words moved: countBits(shift(x,1)) = countBits(x) at :801; reads: %%   property FORALL(x) countFactorsOfTwo(shift(x,1)) + 1 = 0
  - `Specification/basic-lib/basic-integers.tex:801` (Specification/basic-lib/basic-integers.tex): no word to check; reads: %%   property FORALL(x) countBits(shift(x,1)) = countBits(x)
  - `Specification/basic-lib/basic-integers.tex:801-802` (Specification/basic-lib/basic-integers.tex): words moved: x >= 0 at :846,847; reads: %%   property FORALL(x) countBits(shift(x,1)) = countBits(x)
  - `explorations/compile-ladder/rung-spec-integer-rules/probes/skeptic/SkCountBits.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `:788`, `:788-789`, `:810`, `Specification/basic-lib/basic-integers.tex:788-789`
- every check passes

## Row 501, rewritten (1058 characters)
- lengths: row 1058 of 1,200, claim 206 of 300, notes 619 of 700
- reproducer `none`: exists
- citations:
  - `Specification/advanced-lib/algebraic-constraints.tex:1159-1160` (Specification/advanced-lib/algebraic-constraints.tex): no word to check; reads: A \emph{semilattice} is a set of values with an operator \EXP{\sqcap} that is commutative, associative, and idempotent.
  - `Specification/basic-lib/basic-integers.tex:554-560` (Specification/basic-lib/basic-integers.tex): no word to check; reads: The operator \OPR{GCD} computes the greatest common divisor of its two arguments.
  - `Specification/basic-lib/basic-integers.tex:562-564` (Specification/basic-lib/basic-integers.tex): no word to check; reads: The strictly positive integers form a partial order and lattice with
  - `explorations/compile-ladder/rung-spec-integer-rules/probes/skeptic/SkGcdIdem.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `Specification/advanced-lib/algebraic-constraints.tex:1153-1154`, `Specification/basic-lib/basic-integers.tex:541-547`
- every check passes

## Row 700, rewritten (926 characters)
- lengths: row 926 of 1,200, claim 286 of 300, notes 538 of 700
- reproducer `none`: exists
- citations:
  - `Library/Random.fss:226` (Library/Random.fss): no word to check; reads: object LinearCongruential[\N\](seed:N, mult:N, add:N, modulus:N)
  - `Library/Random.fss:239` (Library/Random.fss): holds widen; reads: do state := ((mult DOTTIMES widen(state)) DOTPLUS add) MOD modulus; state end
  - `Library/Random.fss:245` (Library/Random.fss): holds widen; reads: newseed := ((mult DOTTIMES widen(newseed BITXOR p)) DOTPLUS add) MOD modulus
  - `Library/FortressLibrary.fsi:586` (Library/FortressLibrary.fsi): words moved: random at :2573,2574,2711; reads: widen(self):ZZ64
  - `Library/FortressLibrary.fsi:646` (Library/FortressLibrary.fsi): words moved: random at :2573,2574,2711; reads: widen(self):ZZ64
  - `Library/FortressLibrary.fsi:699` (Library/FortressLibrary.fsi): words moved: random at :2573,2574,2711; reads: widen(self): ZZ64
  - `Library/FortressLibrary.fsi:256-257` (Library/FortressLibrary.fsi): no word to check; reads: shouldRaise[\Ex extends Exception\] (expr: ()->()): ()
- in the old line, not in the new: `:235`, `:241`, `:252-253`, `Library/Random.fss:222`
- every check passes

## Row 792, rewritten (1085 characters)
- lengths: row 1085 of 1,200, claim 236 of 300, notes 696 of 700
- reproducer `none`: exists
- citations:
  - `Specification/basic-lib/basic-integers.tex:246-250` (Specification/basic-lib/basic-integers.tex): no word to check; reads: \(  \KWD{opr} \mathord{\div}(\KWD{self}, \VAR{other}\COLON \mathbb{Z})\COLON \mathbb{Z} \KWD{throws}\mskip 4mu plus 4mu\TYP{IntegerDivisionB
  - `Specification/basic-lib/basic-integers.tex:460-464` (Specification/basic-lib/basic-integers.tex): no word to check; reads: \Method{\EXP{\KWD{opr} \mathord{\div}(\KWD{self}, \VAR{other}\COLON \mathbb{Z})\COLON \mathbb{Z} \KWD{throws} \TYP{IntegerDivisionByZero}}}
  - `Specification/basic-lib/basic-integers.tex:481` (Specification/basic-lib/basic-integers.tex): no word to check; reads: For all these operators, if \VAR{other} is zero then an \TYP{IntegerDivisionByZero} is thrown.
  - `Specification/basic/operators/opr-overview.tex:165` (Specification/basic/operators/opr-overview.tex): holds DivisionByZero; reads: For integer results, division by zero throws a \TYP{DivisionByZero}.
  - `Specification/basic/evaluation/completion.tex:31` (Specification/basic/evaluation/completion.tex): holds DivisionByZero; reads: operator) causes a \TYP{DivisionByZero} to be thrown.
  - `Library/FortressLibrary.fsi:1138` (Library/FortressLibrary.fsi): holds DivisionByZero; reads: object DivisionByZero extends UncheckedException
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:747` (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi): holds DivisionByZero; reads: object DivisionByZero extends UncheckedException end
  - `Specification/basic-lib/basic-integers.tex:536` (Specification/basic-lib/basic-integers.tex): no word to check; reads: If the base is \EXP{0}, the power throws \TYP{DivisionByZero}; for any other
- in the old line, not in the new: `Library/FortressLibrary.fsi:1114`, `basic-integers.tex`, `basic-lib/basic-integers.tex`, `reviews/batch-20-review.md`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 327: row 327: rewritten (1039 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 348: row 348: rewritten (1114 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 350: row 350: rewritten (933 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 429: row 429: rewritten (964 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 431: row 431: rewritten (947 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 500: row 500: rewritten (1159 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 501: row 501: rewritten (1058 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 700: row 700: rewritten (926 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 792: row 792: rewritten (1085 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 9 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base de6d905f5 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 9 lines, 0 failing, every check passes.
